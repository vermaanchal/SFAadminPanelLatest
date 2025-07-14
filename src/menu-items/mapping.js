// Importing static menu items
import dashboard from './dashboard';
import appUserDetail from './appuserDetails';
import requests from './requests';
import accountStatus from './accountStatus';
import streamingDetail from './streamingDetail';
import resellerDetails from './resellerDetail';
import updateCoins from './updateCoin';
import updateBeans from './add-deductBeans';
import updateFrame from './updateFrame';
import updateRides from './add-deductRIde';
import VideoRecord from './videoRecord';
import addDesignation from './add-designation';
import assignrole from './assign-role';
import games from './games';
import withdrawRecord from './withdrawRecord';
import reports from './report';
import userReportfeedback from './userReport&feedback';
import endUserStream from './end-userStream';
import getAllResellerSummary from './getAllResellerSummary';
import agentReportfeedback from './agentFeedback';
import agentrecord from './agent';
import bannerstatus from './bannerstatus'
import otpLogs from './otpLogs';
import versionControl from './versionControl';
import playstorepurchase from './playstorePurchase';

// Mapping of menu items
const menuMapping = {
    'Dashboard': dashboard,
    'App User Details': appUserDetail,
    'Purchase & Wallet': playstorepurchase,
    'Reports': reports,
    'Requests': requests,
    'Account Status': accountStatus,
    'Streaming Details': streamingDetail,
    'Reseller Details': resellerDetails,
    'Add/Deduct Coins': updateCoins,
    'Add/Deduct Beans': updateBeans,
    'Add/Remove Frame': updateFrame,
    'Add/Remove Ride': updateRides,
    'Video Record': VideoRecord,
    'Add Designation': addDesignation,
    'Assign Roles': assignrole,
    'Game': games,
    'Get All Reseller Summary': getAllResellerSummary,
    'Withdraw Record': withdrawRecord,
    'User Report & Feedback': userReportfeedback,
    'Agent Feedback Report': agentReportfeedback,
    'End User Stream': endUserStream,
    'Admin/Host/Agency': requests,
    'Agent': agentrecord,
    'banner status': bannerstatus,
    'otp Logs': otpLogs,
    'version control': versionControl,
    // .children.find(child => child.id === 'admin-agency-host')
};

export default menuMapping;
