const status = {
    OPEN: 0,
    COMPLETED: 1,
    IN_COURSE: 2,
    EXPIRED: 3,
};

const statusList = Array.from(Object.keys(status));

const statusKeys = Object.keys(status);

export { status, statusList, statusKeys };
