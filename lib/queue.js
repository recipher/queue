const IDLE = 'idle'
    , BUSY = 'busy';

const DEFAULT_TIMEOUT = 4000;

class Queue {
  constructor() {
    this.taskId = 0;
    this.queue = [];
    this.status = IDLE;
  }

  push(task, onComplete, timeout, delay) {
    this.queue.push({ run: task, onComplete, timeout, delay });

    if (this.status === IDLE) {
      this.status = BUSY;
      this.next(this.taskId);
    }
    return true;
  }

  next(taskId) {
    if (taskId !== this.taskId || this.status !== BUSY) return;

    if (this.timer) {
      clearTimeout(this.timer);
      this.timerId = undefined;
    }

    let task = this.queue.shift();

    if (!task) {
      this.status = IDLE;
      this.taskId++;
      return;
    }

    task.id = ++this.taskId;

    let timeout = task.timeout > 0 ? task.timeout : DEFAULT_TIMEOUT;

    this.timer = setTimeout(function() {
      if (task.onComplete) task.onComplete();

      setTimeout(function() {
        this.next(task.id);
      }.bind(this), task.delay || 0);

    }.bind(this), timeout);

    task.run();
  }
};

export default new Queue;