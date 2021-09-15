import { testHelpers } from "utils/helpers";
import { addAction, asyncActionWatcherReducer, removeAction } from ".";

let store;

describe("asyncActionWatcher reducer and actions", () => {
  beforeEach(() => {
    store = testHelpers.setupStore({
      asyncActionWatcher: asyncActionWatcherReducer,
    });
  });

  it("runningActions default state should be an empty array", () => {
    const { asyncActionWatcher } = store.getState();

    expect(asyncActionWatcher.runningActions).toEqual([]);
  });

  describe("addAction", () => {
    it("should add action into runningActions array", () => {
      const actionType = "ACTION_TYPE";
      store.dispatch(addAction(actionType));

      const { asyncActionWatcher } = store.getState();

      expect(asyncActionWatcher.runningActions).toEqual([actionType]);
    });
  });

  describe("removeAction", () => {
    it("should remove action from runningActions array", () => {
      const actionType1 = "ACTION_TYPE_1";
      const actionType2 = "ACTION_TYPE_2";

      store.dispatch(addAction(actionType1));
      store.dispatch(addAction(actionType2));
      store.dispatch(removeAction(actionType2));

      const { asyncActionWatcher } = store.getState();

      expect(asyncActionWatcher.runningActions).toEqual([actionType1]);
    });
  });
});
