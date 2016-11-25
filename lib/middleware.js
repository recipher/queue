import queue from './queue';

export const QUEUE = '__queue__'; //Symbol('queue');

export default store => next => action => {
  let queuedAction = action[QUEUE];

  if (typeof queuedAction === 'undefined') return next(action);

  const { delay = 4000 } = queuedAction.payload;

  queue.push(() => next(queuedAction), () => store.dispatch(queuedAction.payload.finish), delay, 500);
};
