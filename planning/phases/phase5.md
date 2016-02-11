# Phase 5: User messaging

## Models

### message model
  - validations:  user_id, receiver_id, body, PRESENCE
  - associations: BELONGS_TO user, receiver

### Thread model
  - validations: user_id, receiver_id PRESENCE
  - associations: BELONGS_TO user, receiver

### user model
  - associations: HAS_MANY messages


## Controllers

### messages controller
  - routes:       create (under user)
                  index (under thread)

### threads controller
  - routes:       create (under user)
                  update, show, index

### users controllers
  - routes:       show (add INCLUDES (messages))


## React / Flux

### Components  
  - message
  - thread

### Stores     
  - message_store
  - thread_store

### Constants      
  - message_constants
  - thread_constants

### Actions         
  - message_actions
    - createMessage
  - thread_actions
    - createThread
    - updateThread
    - fetchSingleThread
    - fetchAllThreads
  - api_actions
    - receiveSingleThread (all messages)
    - receiveAllThreads (1 message each, all messages for most recent thread)

### Utils        
  - api_utils
    - createMessage
    - createThread
    - updateThread
    - fetchSingleThread
    - fetchAllThreads
