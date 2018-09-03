'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const { router, controller } = app;

  //前端错误监控
    router.post('/api/frontMonitor', 'monitor.index');

    router.post('/api/user/login', 'user.login');

    router.post('/api/user/register', 'user.register');

    router.get('/api/user/isLogin', 'user.isLogin');

    router.post('/api/user/saveTransferInfo', 'user.transfer');
    router.post('/api/user/gameRecord', 'user.gameRecord');

    router.get('/api/user/getAccount', 'account.getAccount');
    router.post('/api/user/withdraw', 'account.withdraw');

    router.get('/api/game/getHistoryList', 'game.getHistoryList');
};
