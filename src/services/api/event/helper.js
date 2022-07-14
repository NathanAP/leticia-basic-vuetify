const status = {
    OPEN: 0,
    COMPLETED: 1,
    IN_COURSE: 2,
    EXPIRED: 3,
};

const statusList = Array.from(Object.keys(status));

const statusKeys = Object.keys(status);

const priorities = {
    LOW: -1,
    NORMAL: 0,
    HIGH: 1,
};

const priorityList = Array.from(Object.keys(priorities));

const priorityKeys = Object.keys(priorities);

export {
    status,
    statusList,
    statusKeys,
    priorities,
    priorityList,
    priorityKeys,
};
