import dashboard from './dashboard';
import requests from './requests';
import accountStatus from './accountStatus';
import streamingDetail from './streamingDetail';
import resellerDetails from './resellerDetail';
import updateCoins from './updateCoin';
import appUserDetail from './appuserDetails';
import updateBeans from './add-deductBeans';
import updateFrame from './updateFrame';
import updateRides from './add-deductRIde';
import VideoRecord from './videoRecord';
import addDesignation from './add-designation';
import assignrole from './assign-role';
import games from './games';
import userReportfeedback from './userReport&feedback';
import withdrawRecord from './withdrawRecord';
import reports from './report';
import endUserStream from './end-userStream';
import walletFreezeunfreeze from './walletfreezeunfreeze';
import momentUploadList from './momentUpload';
import playstorepurchase from './playstorePurchase';
import updateTheme from './add-dedutTheme';
import getAllResellerSummary from './getAllResellerSummary';
import agentReportfeedback from './agentFeedback';
import agentrecord from './agent';
import bannerstatus from './bannerstatus';
import otpLogs from './otpLogs';
import versionControl from './versionControl';

const staticMenuItems = {
  items: [
    dashboard,
    appUserDetail,
    // momentUploadList,
    // assignrole,
    // addDesignation,
    playstorepurchase,
    // walletFreezeunfreeze,
    accountStatus,
    requests,
    agentrecord,
    bannerstatus,
    games,
    withdrawRecord,
    resellerDetails,
    // getAllResellerSummary,
    updateCoins,
    // updateBeans,
    updateFrame,
    // updateTheme,
    updateRides,
    streamingDetail,
    // VideoRecord,
    // endUserStream,
    reports,
    // userReportfeedback,
    // agentReportfeedback,
    otpLogs,
    versionControl

  ]
};

export default staticMenuItems;
