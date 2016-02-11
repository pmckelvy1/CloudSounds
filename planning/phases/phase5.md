### Phase 5: User messaging ###
###############################

## MODELS

# message model
  - validations:  user_id, receiver_id, body, PRESENCE
  - associations: BELONGS_TO user, receiver

# Thread model
  - validations: user_id, receiver_id PRESENCE
  - associations: BELONGS_TO user, receiver

# user model
  - associations: HAS_MANY messages


## CONTROLLERS

# messages controller
  - routes:       create (under user)
                  index (under thread)

# threads controller
  - routes:       create (under user)
                  update, show, index

# users controllers
  - routes:       show (add INCLUDES (messages))


## REACT / FLUX

# COMPONENTS    
  - message
  - thread

# STORES        
  - message_store
  - thread_store

# CONSTANTS     
  - message_constants
  - thread_constants

# ACTIONS       
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

# UTILS         
  - api_utils
    - createMessage
    - createThread
    - updateThread
    - fetchSingleThread
    - fetchAllThreads
