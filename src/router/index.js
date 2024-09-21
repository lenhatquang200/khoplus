// RootNavigation.js

import {
    createNavigationContainerRef,
    DrawerActions,
    StackActions,
    TabActions,
  } from '@react-navigation/native';
  
  export const navigationRef = createNavigationContainerRef();
  
  function toggleDrawer() {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(DrawerActions.toggleDrawer());
    } else {
    }
  }
  
  function replace(name, params) {
    if (navigationRef.isReady()) {
      // Perform navigation if the react navigation is ready to handle actions
      navigationRef.dispatch(StackActions.replace(name, params));
    } else {
      // You can decide what to do if react navigation is not ready
      // You can ignore this, or add these actions to a queue you can call later
    }
  }
  
  function navigate(name, params) {
    if (navigationRef.isReady()) {
        
        
      // Perform navigation if the react navigation is ready to handle actions
      navigationRef.navigate(name, params);
    } else {
      // You can decide what to do if react navigation is not ready
      // You can ignore this, or add these actions to a queue you can call later
    }
  }
    if (navigationRef.isReady()) {
      // Perform navigation if the react navigation is ready to handle actions
      navigationRef.dispatch(StackActions.push(name, params));
    } else {
      // You can decide what to do if react navigation is not ready
      // You can ignore this, or add these actions to a queue you can call later
    }
  function pop() {
    if (navigationRef.isReady()) {
      // Perform navigation if the react navigation is ready to handle actions
      navigationRef.dispatch(StackActions.pop());
    } else {
      // You can decide what to do if react navigation is not ready
      // You can ignore this, or add these actions to a queue you can call later
    }
  }
  function push(name, params) {
    if (navigationRef.isReady()) {
      // Perform navigation if the react navigation is ready to handle actions
      navigationRef.dispatch(StackActions.push(name, params));
    } else {
      // You can decide what to do if react navigation is not ready
      // You can ignore this, or add these actions to a queue you can call later
    }
  }
  
  function popCount(count) {
    if (navigationRef.isReady()) {
      // Perform navigation if the react navigation is ready to handle actions
      navigationRef.dispatch(StackActions.pop(count));
    } else {
      // You can decide what to do if react navigation is not ready
      // You can ignore this, or add these actions to a queue you can call later
    }
  }
  
  function popToTop() {
    if (navigationRef.isReady()) {
      // Perform navigation if the react navigation is ready to handle actions
      navigationRef.dispatch(StackActions.popToTop());
    } else {
      // You can decide what to do if react navigation is not ready
      // You can ignore this, or add these actions to a queue you can call later
    }
  }
  
  function jumpToTab(name, params) {
    if (navigationRef.isReady()) {
      // Perform navigation if the react navigation is ready to handle actions
      navigationRef.dispatch(TabActions.jumpTo(name, params));
    } else {
      // You can decide what to do if react navigation is not ready
      // You can ignore this, or add these actions to a queue you can call later
    }
  }
  const NavigationRoot = {
    navigate,
    pop,
    toggleDrawer,
    popToTop,
    push,
    replace,
    jumpToTab,
    popCount,
  };
  
  export default NavigationRoot;
  