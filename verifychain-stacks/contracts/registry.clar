;; VerifyChain Registry Contract
;; Full Economic Security Implementation with Admin Controls

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-ALREADY-REGISTERED (err u101))
(define-constant ERR-INSUFFICIENT-STAKE (err u102))
(define-constant ERR-PROVIDER-NOT-FOUND (err u103))
(define-constant ERR-INVALID-PARAMETERS (err u104))
(define-constant ERR-STAKE-LOCKED (err u105))
(define-constant ERR-COMMITMENT-NOT-FOUND (err u106))
(define-constant ERR-INSUFFICIENT-BALANCE (err u107))
(define-constant ERR-CONTRACT-PAUSED (err u108))

;; Contract owner
(define-constant CONTRACT-OWNER tx-sender)

;; Economic parameters
(define-constant BASE-STAKE-RATE u1000) ;; 0.001 STX per MB per block
(define-constant MIN-STAKE-AMOUNT u1000000) ;; Minimum 1 STX stake
(define-constant WITHDRAWAL-DELAY u144) ;; 24 hours delay (144 blocks)

;; Data variables
(define-data-var next-provider-id uint u1)
(define-data-var next-commitment-id uint u1)
(define-data-var contract-paused bool false)

;; Provider data structure
(define-map providers
  { provider-id: uint }
  {
    owner: principal,
    storage-capacity: uint,
    active: bool,
    registration-block: uint
  }
)

;; Provider lookup by principal
(define-map provider-lookup
  { owner: principal }
  { provider-id: uint }
)

;; Staking data
(define-map provider-stakes
  { provider-id: uint }
  {
    total-staked: uint,
    locked-stake: uint,
    available-stake: uint,
    pending-withdrawals: uint,
    last-withdrawal-request: uint
  }
)

;; Reputation tracking
(define-map provider-reputation
  { provider-id: uint }
  {
    verification-success-count: uint,
    verification-failure-count: uint,
    total-commitments: uint,
    last-activity-block: uint
  }
)

;; Commitment data structure
(define-map commitments
  { commitment-id: uint }
  {
    provider-id: uint,
    data-root: (buff 32),
    chunk-count: uint,
    storage-size-mb: uint,
    duration-blocks: uint,
    stake-required: uint,
    start-block: uint,
    end-block: uint,
    data-owner: principal,
    active: bool
  }
)

;; Helper functions

;; Calculate required stake for a commitment
(define-private (calculate-stake-required (storage-mb uint) (duration-blocks uint))
  (let ((calculated-stake (* (* storage-mb duration-blocks) BASE-STAKE-RATE)))
    (if (>= calculated-stake MIN-STAKE-AMOUNT)
      calculated-stake
      MIN-STAKE-AMOUNT)))

;; Check if contract is not paused
(define-private (check-contract-active)
  (if (not (var-get contract-paused))
    (ok true)
    ERR-CONTRACT-PAUSED
  )
)

;; Public functions

;; Register as a storage provider with initial stake
(define-public (register-provider (storage-capacity uint) (initial-stake uint))
  (begin
    ;; Check contract not paused
    (try! (check-contract-active))

    ;; Check if already registered
    (asserts! (is-none (map-get? provider-lookup { owner: tx-sender })) ERR-ALREADY-REGISTERED)

    ;; Validate parameters
    (asserts! (> storage-capacity u0) ERR-INVALID-PARAMETERS)
    (asserts! (>= initial-stake MIN-STAKE-AMOUNT) ERR-INSUFFICIENT-STAKE)
    (asserts! (>= (stx-get-balance tx-sender) initial-stake) ERR-INSUFFICIENT-BALANCE)

    ;; Get new provider ID
    (let ((new-id (var-get next-provider-id)))

      ;; Transfer stake to contract
      (try! (stx-transfer? initial-stake tx-sender (as-contract tx-sender)))

      ;; Register provider
      (map-set providers 
        { provider-id: new-id }
        {
          owner: tx-sender,
          storage-capacity: storage-capacity,
          active: true,
          registration-block: block-height
        })

      ;; Initialize staking data
      (map-set provider-stakes
        { provider-id: new-id }
        {
          total-staked: initial-stake,
          locked-stake: u0,
          available-stake: initial-stake,
          pending-withdrawals: u0,
          last-withdrawal-request: u0
        })

      ;; Initialize reputation
      (map-set provider-reputation
        { provider-id: new-id }
        {
          verification-success-count: u0,
          verification-failure-count: u0,
          total-commitments: u0,
          last-activity-block: block-height
        })

      ;; Create lookup
      (map-set provider-lookup
        { owner: tx-sender }
        { provider-id: new-id })

      ;; Increment ID
      (var-set next-provider-id (+ new-id u1))

      (ok new-id))))

;; Add additional stake to provider account
(define-public (add-stake (additional-amount uint))
  (begin
    ;; Check contract not paused
    (try! (check-contract-active))

    ;; Validate amount
    (asserts! (> additional-amount u0) ERR-INVALID-PARAMETERS)
    (asserts! (>= (stx-get-balance tx-sender) additional-amount) ERR-INSUFFICIENT-BALANCE)

    ;; Get provider ID
    (let ((provider-lookup-result (unwrap! (map-get? provider-lookup { owner: tx-sender }) ERR-PROVIDER-NOT-FOUND)))
      (let ((provider-id (get provider-id provider-lookup-result)))
        (let ((stake-data (unwrap! (map-get? provider-stakes { provider-id: provider-id }) ERR-PROVIDER-NOT-FOUND)))

          ;; Transfer additional stake
          (try! (stx-transfer? additional-amount tx-sender (as-contract tx-sender)))

          ;; Update stake data
          (map-set provider-stakes
            { provider-id: provider-id }
            (merge stake-data {
              total-staked: (+ (get total-staked stake-data) additional-amount),
              available-stake: (+ (get available-stake stake-data) additional-amount)
            }))

          (ok additional-amount))))))

;; Create storage commitment
(define-public (create-commitment 
  (provider-id uint) 
  (data-root (buff 32)) 
  (chunk-count uint)
  (storage-size-mb uint)
  (duration-blocks uint))
  (begin
    ;; Check contract not paused
    (try! (check-contract-active))

    ;; Validate parameters
    (asserts! (> chunk-count u0) ERR-INVALID-PARAMETERS)
    (asserts! (> storage-size-mb u0) ERR-INVALID-PARAMETERS)
    (asserts! (> duration-blocks u0) ERR-INVALID-PARAMETERS)

    ;; Get provider data
    (let ((provider (unwrap! (map-get? providers { provider-id: provider-id }) ERR-PROVIDER-NOT-FOUND)))
      (let ((stake-data (unwrap! (map-get? provider-stakes { provider-id: provider-id }) ERR-PROVIDER-NOT-FOUND)))
        (let ((reputation-data (unwrap! (map-get? provider-reputation { provider-id: provider-id }) ERR-PROVIDER-NOT-FOUND)))
          (let ((required-stake (calculate-stake-required storage-size-mb duration-blocks))
                (new-id (var-get next-commitment-id)))

            ;; Check if provider is active
            (asserts! (get active provider) ERR-PROVIDER-NOT-FOUND)

            ;; Check if provider has enough available stake
            (asserts! (>= (get available-stake stake-data) required-stake) ERR-INSUFFICIENT-STAKE)

            ;; Check storage capacity
            (asserts! (<= storage-size-mb (get storage-capacity provider)) ERR-INVALID-PARAMETERS)

            ;; Create commitment
            (map-set commitments
              { commitment-id: new-id }
              {
                provider-id: provider-id,
                data-root: data-root,
                chunk-count: chunk-count,
                storage-size-mb: storage-size-mb,
                duration-blocks: duration-blocks,
                stake-required: required-stake,
                start-block: block-height,
                end-block: (+ block-height duration-blocks),
                data-owner: tx-sender,
                active: true
              })

            ;; Lock stake for this commitment
            (map-set provider-stakes
              { provider-id: provider-id }
              (merge stake-data {
                locked-stake: (+ (get locked-stake stake-data) required-stake),
                available-stake: (- (get available-stake stake-data) required-stake)
              }))

            ;; Update reputation
            (map-set provider-reputation
              { provider-id: provider-id }
              (merge reputation-data {
                total-commitments: (+ (get total-commitments reputation-data) u1),
                last-activity-block: block-height
              }))

            ;; Increment commitment ID
            (var-set next-commitment-id (+ new-id u1))

            (ok new-id)))))))

;; Complete commitment and unlock stake
(define-public (complete-commitment (commitment-id uint))
  (let ((commitment (unwrap! (map-get? commitments { commitment-id: commitment-id }) ERR-COMMITMENT-NOT-FOUND)))
    (let ((provider-id (get provider-id commitment)))
      (let ((stake-data (unwrap! (map-get? provider-stakes { provider-id: provider-id }) ERR-PROVIDER-NOT-FOUND)))
        (let ((provider (unwrap! (map-get? providers { provider-id: provider-id }) ERR-PROVIDER-NOT-FOUND)))

          ;; Check if commitment is active
          (asserts! (get active commitment) ERR-INVALID-PARAMETERS)

          ;; Check if commitment period has ended
          (asserts! (>= block-height (get end-block commitment)) ERR-INVALID-PARAMETERS)

          ;; Check authorization
          (asserts! (or 
            (is-eq tx-sender (get data-owner commitment))
            (is-eq tx-sender (get owner provider))
            (is-eq tx-sender CONTRACT-OWNER)
          ) ERR-NOT-AUTHORIZED)

          ;; Deactivate commitment
          (map-set commitments
            { commitment-id: commitment-id }
            (merge commitment { active: false }))

          ;; Unlock stake
          (let ((stake-required (get stake-required commitment)))
            (map-set provider-stakes
              { provider-id: provider-id }
              (merge stake-data {
                locked-stake: (- (get locked-stake stake-data) stake-required),
                available-stake: (+ (get available-stake stake-data) stake-required)
              })))

          (ok commitment-id))))))

;; Slash provider stake
(define-public (slash-provider-stake (provider-id uint) (slash-amount uint))
  (begin
    ;; Only contract owner can slash for now
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)

    (let ((stake-data (unwrap! (map-get? provider-stakes { provider-id: provider-id }) ERR-PROVIDER-NOT-FOUND)))
      (let ((reputation-data (unwrap! (map-get? provider-reputation { provider-id: provider-id }) ERR-PROVIDER-NOT-FOUND)))
        (let ((available-for-slash (+ (get available-stake stake-data) (get locked-stake stake-data))))
          (let ((actual-slash (if (<= slash-amount available-for-slash) slash-amount available-for-slash)))

            ;; Update stake data
            (if (>= (get available-stake stake-data) actual-slash)
              ;; Slash from available stake first
              (map-set provider-stakes
                { provider-id: provider-id }
                (merge stake-data {
                  total-staked: (- (get total-staked stake-data) actual-slash),
                  available-stake: (- (get available-stake stake-data) actual-slash)
                }))
              ;; Slash from both available and locked stake
              (map-set provider-stakes
                { provider-id: provider-id }
                (merge stake-data {
                  total-staked: (- (get total-staked stake-data) actual-slash),
                  available-stake: u0,
                  locked-stake: (- (get locked-stake stake-data) (- actual-slash (get available-stake stake-data)))
                })))

            ;; Update reputation
            (map-set provider-reputation
              { provider-id: provider-id }
              (merge reputation-data {
                verification-failure-count: (+ (get verification-failure-count reputation-data) u1),
                last-activity-block: block-height
              }))

            (ok actual-slash)))))))

;; Request stake withdrawal
(define-public (request-withdrawal (amount uint))
  (begin
    (asserts! (> amount u0) ERR-INVALID-PARAMETERS)

    (let ((provider-lookup-result (unwrap! (map-get? provider-lookup { owner: tx-sender }) ERR-PROVIDER-NOT-FOUND)))
      (let ((provider-id (get provider-id provider-lookup-result)))
        (let ((stake-data (unwrap! (map-get? provider-stakes { provider-id: provider-id }) ERR-PROVIDER-NOT-FOUND)))

          (asserts! (<= amount (get available-stake stake-data)) ERR-INSUFFICIENT-STAKE)

          ;; Update stake data
          (map-set provider-stakes
            { provider-id: provider-id }
            (merge stake-data {
              available-stake: (- (get available-stake stake-data) amount),
              pending-withdrawals: (+ (get pending-withdrawals stake-data) amount),
              last-withdrawal-request: block-height
            }))

          (ok amount))))))

;; Execute withdrawal
(define-public (execute-withdrawal)
  (let ((provider-lookup-result (unwrap! (map-get? provider-lookup { owner: tx-sender }) ERR-PROVIDER-NOT-FOUND)))
    (let ((provider-id (get provider-id provider-lookup-result)))
      (let ((stake-data (unwrap! (map-get? provider-stakes { provider-id: provider-id }) ERR-PROVIDER-NOT-FOUND)))
        (let ((withdrawal-amount (get pending-withdrawals stake-data)))

          ;; Check if there are pending withdrawals
          (asserts! (> withdrawal-amount u0) ERR-INVALID-PARAMETERS)

          ;; Check if delay period has passed
          (asserts! (>= block-height (+ (get last-withdrawal-request stake-data) WITHDRAWAL-DELAY)) ERR-STAKE-LOCKED)

          ;; Transfer STX back to provider
          (try! (as-contract (stx-transfer? withdrawal-amount tx-sender tx-sender)))

          ;; Update stake data
          (map-set provider-stakes
            { provider-id: provider-id }
            (merge stake-data {
              total-staked: (- (get total-staked stake-data) withdrawal-amount),
              pending-withdrawals: u0
            }))

          (ok withdrawal-amount))))))

;; Record successful verification
(define-public (record-successful-verification (provider-id uint))
  (begin
    ;; Only contract owner can update for now
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)

    (let ((reputation-data (unwrap! (map-get? provider-reputation { provider-id: provider-id }) ERR-PROVIDER-NOT-FOUND)))
      (map-set provider-reputation
        { provider-id: provider-id }
        (merge reputation-data {
          verification-success-count: (+ (get verification-success-count reputation-data) u1),
          last-activity-block: block-height
        }))

      (ok (+ (get verification-success-count reputation-data) u1)))))

;; Read-only functions

(define-read-only (get-provider (provider-id uint))
  (map-get? providers { provider-id: provider-id }))

(define-read-only (get-provider-by-principal (owner principal))
  (match (map-get? provider-lookup { owner: owner })
    some-id (map-get? providers { provider-id: (get provider-id some-id) })
    none))

(define-read-only (get-provider-stakes (provider-id uint))
  (map-get? provider-stakes { provider-id: provider-id }))

(define-read-only (get-provider-reputation (provider-id uint))
  (map-get? provider-reputation { provider-id: provider-id }))

(define-read-only (get-commitment (commitment-id uint))
  (map-get? commitments { commitment-id: commitment-id }))

(define-read-only (get-stake-required (storage-mb uint) (duration-blocks uint))
  (calculate-stake-required storage-mb duration-blocks))

(define-read-only (get-contract-status)
  {
    next-provider-id: (var-get next-provider-id),
    next-commitment-id: (var-get next-commitment-id),
    paused: (var-get contract-paused)
  })

;; Admin functions (Contract Owner only)

;; Emergency pause
(define-public (pause-contract)
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (var-set contract-paused true)
    (ok true)))

;; Unpause contract
(define-public (unpause-contract)
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (var-set contract-paused false)
    (ok true)))
