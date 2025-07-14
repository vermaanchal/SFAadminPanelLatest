import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AdminRequest from 'pages/extra-pages/requests/adminRequest';
import AgencyRequest from 'pages/extra-pages/requests/agencyRequest';
import HostRequest from 'pages/extra-pages/requests/hostRequest';
import AdminAgencyHostRequest from 'pages/extra-pages/requests/adminagencyHostRequest';
import AppUserDetails from 'pages/extra-pages/appUserDetails';
import IdBanUnban from 'pages/extra-pages/accountstatus/Idbanunban';
import DeviceIdBlockUnblock from 'pages/extra-pages/accountstatus/deviceIdblockunblock';
import VideoStreaming from 'pages/extra-pages/streamingDetails/videoStreaming';
import AudioStreaming from 'pages/extra-pages/streamingDetails/audioStreaming';
import CreateReseller from 'pages/extra-pages/reseller-Details/createReseller';
import CoinReselling from 'pages/extra-pages/reseller-Details/coinReselling';
import DeductResellerCoin from 'pages/extra-pages/reseller-Details/deductResellerCoin';
import UpdateUserCoin from 'pages/extra-pages/add/deduct_usercoin/UpdateUserCoin';
import VideoUploadRecord from 'pages/extra-pages/video-upload/VideoUploadRecord';
import AddDesignation from 'pages/extra-pages/add-designation/AddDesignation';
import AssignRole from 'pages/extra-pages/assign-role/AssignROle';
import TeenPatti from 'pages/extra-pages/game/teenPatti';
import FruitSlot from 'pages/extra-pages/game/fruitSlot';
import TripleSeven from 'pages/extra-pages/game/777';
import BankWithdraw from 'pages/extra-pages/withdrawRecord/bank';
import WalletWithdraw from 'pages/extra-pages/withdrawRecord/wallet';
import UpdateBeans from 'pages/extra-pages/add-deductBean/AddDeductBeans';
import UpdateUserRide from 'pages/extra-pages/add-remove-ride/AddRemoveRide';
import Login from 'pages/authentication/Login';
import AgencyInsideAdmin from 'pages/extra-pages/requests/AgencyInsideAdmin';
import SFAguess from 'pages/extra-pages/game/SFAguess';
import HostInsideAgency from 'pages/extra-pages/requests/HostinsideAgency';
import UpdateFrames from 'pages/extra-pages/add-remove-frame/addRemoveFrames';
import ReceivingReport from 'pages/extra-pages/reports/ReceivingReport';
import SendingReport from 'pages/extra-pages/reports/sendingReport';
import EndUserStream from 'pages/extra-pages/end-user-stream/EndUserStream';
// import ChangePassword from 'pages/authentication/ChangePassword';
import UserReportnFeedback from 'pages/extra-pages/feedbackreport-detail/userReport&feedback';
import AudioStreamingTodayReport from 'pages/extra-pages/streamingDetails/AudioStreaminTodayReport';
import AudioStreamingMonthlyReport from 'pages/extra-pages/streamingDetails/AudioStreamingMonthlyReport';
import VideoStreamingTodayReport from 'pages/extra-pages/streamingDetails/VideoStreamingTodayReport';
import VideoStreamingMonthlyReport from 'pages/extra-pages/streamingDetails/VideoStreamingMonthlyReport';
import AdminReceivingReport from 'pages/extra-pages/reports/AdminReceivingReport';
import AgencyReceivingReport from 'pages/extra-pages/reports/AgencyReceivingReport';
import SpinGame from 'pages/extra-pages/game/SpinGame';
import WalletFreezeUnfreeze from 'pages/extra-pages/WalletFreezeUnfreeze/WalletFreezeUnfreez';
import MomentUploadList from 'pages/extra-pages/momentUploadList/MomentUploadList';
import SFALudo from 'pages/extra-pages/game/sfaLudo';
import PlayStoreRecord from 'pages/extra-pages/playstorePurchase/PlayStore';
import MonthlyReport from 'pages/extra-pages/reports/MonthlyReport';
import SFAKeno from 'pages/extra-pages/game/SFAKeno';
import AddRemoveTheme from 'pages/extra-pages/add-remove-theme/AddremoveTheme';
import AllReceivingReport from 'pages/extra-pages/reports/AllReceivings';
import MonthlyReceiverReport from 'pages/extra-pages/reports/MonthlyReceiverReport';
import SFAGuessRecord from 'pages/extra-pages/game/SFAGuessRecord';
import SFAGuessRecordTime from 'pages/extra-pages/game/SFAGuessRecordTime';
import AudioStreamingViewMore from 'pages/extra-pages/streamingDetails/AudioStreamingViewMore';
import GetAllResellerSummary from 'pages/extra-pages/reseller-Details/GetAllResellerSummary';
import AgentRequest from 'pages/extra-pages/requests/AgentRequest';
import ApproveAgentRequest from 'pages/extra-pages/requests/ApproveAgentRequest';
import AgentFeedbackReport from 'pages/extra-pages/feedbackreport-detail/AgentFeedbackReport';
import AgentCallrecords from 'pages/extra-pages/requests/AgentCallrecords';
import GetonlineLiveAgent from 'pages/extra-pages/requests/GetonlineLiveAgent';
import BannerUpload from 'pages/extra-pages/bannerUpload/BannerUpload';
import { useRoutes, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute'
import WhatsappLogs from 'pages/extra-pages/otpLogs/WhatsappLogs';
import VersionUpdate from 'pages/extra-pages/versionControl/VersionUpdate';

// render - dashboard
const email = localStorage.getItem('uservalue');
// let DashboardDefault;
// if (email !== '') {
// }
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Login />
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
      // element: email !== '' ? <DashboardDefault /> : <Navigate to="/login" />,
    },
    {
      path: 'appuserdetails',
      element:
        (
          <ProtectedRoute>
            <AppUserDetails />
          </ProtectedRoute>
        )
    },
    {
      path: 'adminRequest',
      element:
        (
          <ProtectedRoute>
            <AdminRequest />
          </ProtectedRoute>
        )
    },
    {
      path: 'agencyRequest',
      element: (
        <ProtectedRoute>
          <AgencyRequest />
        </ProtectedRoute>
      )
    },
    {
      path: 'hostRequest',
      element:
        (
          <ProtectedRoute>
            <HostRequest />
          </ProtectedRoute>)
    },
    {
      path: 'AdminAgencyHost',
      element: (
        <ProtectedRoute>
          <AdminAgencyHostRequest />
        </ProtectedRoute>)
    },
    {
      path: 'AgentRequest',
      element: (
        <ProtectedRoute>
          <AgentRequest />
        </ProtectedRoute>)
    },
    {
      path: 'ApproveAgentRequest',
      element: (
        <ProtectedRoute>
          <ApproveAgentRequest />
        </ProtectedRoute>)
    },
    {
      path: 'AgentCallrecords',
      element: (
        <ProtectedRoute>
          <AgentCallrecords />
        </ProtectedRoute>)
    },
    {
      path: 'IDBanUnBan',
      element: (
        <ProtectedRoute>
          <IdBanUnban />
        </ProtectedRoute>)
    },
    {
      path: 'DeviceBlock',
      element: (
        <ProtectedRoute>
          <DeviceIdBlockUnblock />
        </ProtectedRoute>)
    },
    {
      path: 'audiostreaming',
      element: (
        <ProtectedRoute>
          <AudioStreaming />
        </ProtectedRoute>)
    },
    {
      path: 'videostreaming',
      element: (
        <ProtectedRoute>
          <VideoStreaming />
        </ProtectedRoute>)
    },
    {
      path: 'Reseller',
      element: (
        <ProtectedRoute>
          <CreateReseller />
        </ProtectedRoute>)
    },
    {
      path: 'CoinResell',
      element: (
        <ProtectedRoute>
          <CoinReselling />
        </ProtectedRoute>)
    },
    {
      path: 'GetAllResellerSummary',
      element: (
        <ProtectedRoute>
          <GetAllResellerSummary />
        </ProtectedRoute>)
    },
    {
      path: 'DeductResellCoin',
      element: (
        <ProtectedRoute>
          <DeductResellerCoin />
        </ProtectedRoute>)
    },
    {
      path: 'UpdateUserCoin',
      element: (
        <ProtectedRoute>
          <UpdateUserCoin />
        </ProtectedRoute>)
    },
    {
      path: 'BeanTransferView',
      element: (
        <ProtectedRoute>
          <UpdateBeans />
        </ProtectedRoute>)
    },
    {
      path: 'updateFrame',
      element: (
        <ProtectedRoute>
          <UpdateFrames />
        </ProtectedRoute>)
    },
    {
      path: 'UserRide',
      element: (
        <ProtectedRoute>
          <UpdateUserRide />
        </ProtectedRoute>)
    },
    {
      path: 'VideoUploadRecord',
      element: (
        <ProtectedRoute>
          <VideoUploadRecord />
        </ProtectedRoute>)
    },
    {
      path: 'CreateDesignation',
      element: (
        <ProtectedRoute>
          <AddDesignation />
        </ProtectedRoute>)
    },
    {
      path: 'AssignRole',
      element: (
        <ProtectedRoute>
          <AssignRole />
        </ProtectedRoute>)
    },
    {
      path: 'SFAgame',
      element: (
        <ProtectedRoute>
          <SFAguess />
        </ProtectedRoute>)
    },
    {
      path: 'SFAGuessRecordTime',
      element: (
        <ProtectedRoute>
          <SFAGuessRecordTime />
        </ProtectedRoute>)
    },
    {
      path: 'sfa-guess-record',
      element: (
        <ProtectedRoute>
          <SFAGuessRecord />
        </ProtectedRoute>)
    },
    {
      path: 'TeenPati',
      element: (
        <ProtectedRoute>
          <TeenPatti />
        </ProtectedRoute>)
    },
    {
      path: 'Fruitslot',
      element: (
        <ProtectedRoute>
          <FruitSlot />
        </ProtectedRoute>)
    },
    {
      path: 'TrippleSeven_Game',
      element: (
        <ProtectedRoute>
          <TripleSeven />
        </ProtectedRoute>)
    },
    {
      path: 'TeenPati',
      element: (
        <ProtectedRoute>
          <TeenPatti />
        </ProtectedRoute>)
    },
    {
      path: 'SFASpinGame',
      element: (
        <ProtectedRoute>
          <SpinGame />
        </ProtectedRoute>)
    },
    {
      path: 'BankWithdraw',
      element: (
        <ProtectedRoute>
          <BankWithdraw />
        </ProtectedRoute>)
    },
    {
      path: 'WalletWithdraw',
      element: (
        <ProtectedRoute>
          <WalletWithdraw />
        </ProtectedRoute>)
    },
    {
      path: 'UserReport',
      element: (
        <ProtectedRoute>
          <UserReportnFeedback />
        </ProtectedRoute>)
    },
    {
      path: 'getOnlineAgent',
      element: (
        <ProtectedRoute>
          <GetonlineLiveAgent />
        </ProtectedRoute>)
    },
    {
      path: 'agentfeedback',
      element: (
        <ProtectedRoute>
          <AgentFeedbackReport />
        </ProtectedRoute>)
    },
    {
      path: 'walletFreezeUnfreeze',
      element: (
        <ProtectedRoute>
          <WalletFreezeUnfreeze />
        </ProtectedRoute>)
    },
    {
      path: 'AdminAgencyHost/:adminId',
      element: (
        <ProtectedRoute>
          <AgencyInsideAdmin />
        </ProtectedRoute>)
    },
    {
      path: 'AgencyInsideAdmin/:agencyCode',
      element: (
        <ProtectedRoute>
          <HostInsideAgency />
        </ProtectedRoute>)
    },
    {
      path: 'HostReceivingReport',
      element: (
        <ProtectedRoute>
          <ReceivingReport />
        </ProtectedRoute>)
    },
    {
      path: 'UserSendingReport',
      element: (
        <ProtectedRoute>
          <SendingReport />
        </ProtectedRoute>)
    },
    {
      path: 'AdminReport',
      element: (
        <ProtectedRoute>
          <AdminReceivingReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'AgencyReport',
      element: (
        <ProtectedRoute>
          <AgencyReceivingReport />
        </ProtectedRoute>)
    },
    {
      path: 'AllReceiving',
      element: (
        <ProtectedRoute>
          <AllReceivingReport />
        </ProtectedRoute>)
    },
    {
      path: 'UserLiveDetails',
      element: (
        <ProtectedRoute>
          <EndUserStream />
        </ProtectedRoute>)
    },
    // {
    //   path: '/changepassword',
    //   element: <ChangePassword />
    // },
    // {
    //   path: 'useraudiostreaming/:userId',
    //   element: <AudioStreamingTodayReport />
    // },
    {
      path: 'ViewMoreAudioReportResponse/:userId',
      element:
        (
          <ProtectedRoute>
            <AudioStreamingViewMore />
          </ProtectedRoute>)
    },
    {
      path: 'UserTodayAudioStreamingDetails/:userId',
      element: (
        <ProtectedRoute>
          <AudioStreamingTodayReport />
        </ProtectedRoute>)
    },
    // {
    //   path: 'audiomonthlyreport/:userId',
    //   element: <AudioStreamingMonthlyReport />
    // },
    {
      path: 'UserMonthlyAudioStreamingDetails/:userId',
      element: (
        <ProtectedRoute>
          <AudioStreamingMonthlyReport />
        </ProtectedRoute>)
    },
    {
      path: 'uservideostreaming/:userId',
      element: (
        <ProtectedRoute>
          <VideoStreamingTodayReport />
        </ProtectedRoute>)
    },
    {
      path: 'videomonthlyreport/:userId',
      element: (
        <ProtectedRoute>
          <VideoStreamingMonthlyReport />
        </ProtectedRoute>)
    },
    {
      path: 'MomentUploadList',
      element: (
        <ProtectedRoute>
          <MomentUploadList />
        </ProtectedRoute>)
    },
    // {
    //   path: 'SFAludo',
    //   element: (
    //     <ProtectedRoute>
    //       <SFALudo />
    //     </ProtectedRoute>)
    // },
    {
      path: 'SFAkeno',
      element: (
        <ProtectedRoute>
          <SFAKeno />
        </ProtectedRoute>)
    },
    {
      path: 'playStorePurchaseRecord',
      element: (
        <ProtectedRoute>
          <PlayStoreRecord />
        </ProtectedRoute>)
    },
    {
      path: 'MonthlySenderReport',
      element: (
        <ProtectedRoute>
          <MonthlyReport />
        </ProtectedRoute>)
    },
    {
      path: 'MonthlyReceiverReport',
      element: (
        <ProtectedRoute>
          <MonthlyReceiverReport />
        </ProtectedRoute>)
    },
    {
      path: 'updateTheme',
      element:
        (
          <ProtectedRoute>
            <AddRemoveTheme />
          </ProtectedRoute>)
    },
    {
      path: 'bannerUpload',
      element:
        (
          <ProtectedRoute>
            <BannerUpload />
          </ProtectedRoute>)
    },
    {
      path: 'whatsapp_otp_logs',
      element:
        (
          <ProtectedRoute>
            <WhatsappLogs />
          </ProtectedRoute>)
    },
    {
      path: 'version_control',
      element:
        (
          <ProtectedRoute>
            < VersionUpdate />
          </ProtectedRoute>)
    },

  ]
};

export default MainRoutes;
