const State = {
    RUNNING: Symbol("running"),
    JUMPING: Symbol("jumping"),
    FALLING: Symbol("falling"),
    DIE: Symbol("die") 
};
Object.freeze(State);