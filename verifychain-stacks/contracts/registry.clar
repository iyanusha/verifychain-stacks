;; VerifyChain Registry Contract
;; Handles storage provider registration and basic storage commitments

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-ALREADY-REGISTERED (err u101))
(define-constant ERR-INSUFFICIENT-STAKE (err u102))
(define-constant ERR-PROVIDER-NOT-FOUND (err u103))
(define-constant ERR-INVALID-PARAMETERS (err u104))

;; Contract owner
(define-constant CONTRACT-OWNER tx-sender)

;; Minimum stake required (1 STX)
(define-constant MIN-STAKE u1000000)

;; Data variables
(define-data-var next-provider-id uint u1)
(define-data-var next-commitment-id uint u1)

;; Maps
(define-map providers
  { provider-id: uint }
  {
    owner: principal,
    stake-amount: uint,
    storage-capacity: uint,
    active: bool
  }
)

(define-map provider-lookup
  { owner: principal }
  { provider-id: uint }
)

(define-map commitments
  { commitment-id: uint }
  {
    provider-id: uint,
    data-root: (buff 32),
    chunk-count: uint,
    active: bool
  }
)

;; Register as a storage provider
(define-public (register-provider (storage-capacity uint))
  (let 
    (
      (new-id (var-get next-provider-id))
    )
    ;; Check if already registered
    (asserts! (is-none (map-get? provider-lookup { owner: tx-sender })) ERR-ALREADY-REGISTERED)

    ;; Check if enough STX
    (asserts! (>= (stx-get-balance tx-sender) MIN-STAKE) ERR-INSUFFICIENT-STAKE)

    ;; Check valid capacity
    (asserts! (> storage-capacity u0) ERR-INVALID-PARAMETERS)

    ;; Transfer stake
    (try! (stx-transfer? MIN-STAKE tx-sender (as-contract tx-sender)))

    ;; Register provider
    (map-set providers 
      { provider-id: new-id }
      {
        owner: tx-sender,
        stake-amount: MIN-STAKE,
        storage-capacity: storage-capacity,
        active: true
      }
    )

    ;; Create lookup
    (map-set provider-lookup
      { owner: tx-sender }
      { provider-id: new-id }
    )

    ;; Increment ID
    (var-set next-provider-id (+ new-id u1))

    (ok new-id)
  )
)

;; Create storage commitment
(define-public (create-commitment (provider-id uint) (data-root (buff 32)) (chunk-count uint))
  (let
    (
      (provider (unwrap! (map-get? providers { provider-id: provider-id }) ERR-PROVIDER-NOT-FOUND))
      (new-id (var-get next-commitment-id))
    )
    ;; Check if provider is active
    (asserts! (get active provider) ERR-PROVIDER-NOT-FOUND)

    ;; Check valid parameters
    (asserts! (> chunk-count u0) ERR-INVALID-PARAMETERS)

    ;; Create commitment
    (map-set commitments
      { commitment-id: new-id }
      {
        provider-id: provider-id,
        data-root: data-root,
        chunk-count: chunk-count,
        active: true
      }
    )

    ;; Increment ID
    (var-set next-commitment-id (+ new-id u1))

    (ok new-id)
  )
)

;; Get provider info
(define-read-only (get-provider (provider-id uint))
  (map-get? providers { provider-id: provider-id })
)

;; Get provider by principal
(define-read-only (get-provider-by-principal (owner principal))
  (match (map-get? provider-lookup { owner: owner })
    some-id (map-get? providers { provider-id: (get provider-id some-id) })
    none
  )
)

;; Get commitment info
(define-read-only (get-commitment (commitment-id uint))
  (map-get? commitments { commitment-id: commitment-id })
)

;; Get next IDs
(define-read-only (get-next-ids)
  {
    next-provider-id: (var-get next-provider-id),
    next-commitment-id: (var-get next-commitment-id)
  }
)
