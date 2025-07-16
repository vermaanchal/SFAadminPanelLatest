
import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  MenuItem,
  Select, Divider
} from '@mui/material';

import DownloadIcon from '@mui/icons-material/CloudDownload';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import p1 from "../../assets/images/users/p1.png"
import p2 from "../../assets/images/users/p2.png"
import p3 from "../../assets/images/users/p3.png"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useDashboardHook from './DashboardHook';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../node_modules/@fortawesome/free-solid-svg-icons/index';

const GameCard = ({ title, totalBet, winAmount, profit, color }) => (

  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
    <Card className="flex-grow-1"
      sx={{

        boxShadow: 0,
        borderRadius: 5

      }}>
      <CardContent >
        <Box sx={{ padding: 2, }}>

          <Typography variant="subtitle1" fontWeight="bold" >
            {title}
          </Typography>

        </Box>
        <Divider sx={{ borderBottomWidth: 2, borderColor: "#EAEAEB", }} />
        <Box className="d-flex justify-content-between align-items-center mt-3 px-3" >
          <div style={styles.statBox}>
            <div style={{ ...styles.iconBox, ...styles.yellow }}>
              <img src={p3} alt="Total Bet" style={styles.iconImg} />
            </div>
            <span>Total Bet = <strong>{totalBet}</strong></span>
          </div>
          {/* <div style={styles.statBox}>
            <div style={{ ...styles.iconBox, ...styles.pink }}>
              <img src={p2} alt="Total Win" style={styles.iconImg} />
            </div>
            <span>Win amount  =  <strong style={styles.profitGreen}>{winAmount}</strong></span>
          </div> */}
        </Box>
        <Box >
          <div className="d-flex  align-items-center mt-4 mx-3" sx={{ gap: 2 }}>
            <div style={{ ...styles.iconBox, ...styles.pink }}>
              <img src={p2} alt="Total Win" style={styles.iconImg} />
            </div>
            <span className='mx-2'>Win amount  =  <strong style={styles.profitGreen}>{winAmount}</strong></span>


          </div>
        </Box>

        <Box className="d-flex  align-items-center mt-4 mx-3" sx={{ gap: 2 }}>
          <div style={{ ...styles.iconBox, ...styles.green }}>
            <img src={p1} alt="Profit" style={styles.iconImg} />
          </div>
          <span style={styles.statBox}>
            Profit = <strong style={styles.profitGreen}>{profit}</strong>
            <Typography variant="body2">➤</Typography>
          </span>
        </Box>
      </CardContent>
    </Card>
    <Box>
      <KeyboardArrowRightIcon sx={{ color: "#fff" }} />
    </Box>
  </Box>
);
const DashboardDefault = () => {
  const { data, loading, error } = useDashboardHook();

  const gameStats = [
    {
      title: 'SFA GUESS',
      totalBet: 100000,
      winAmount: 3000,
      profit: 100000,
      // color: '#52c7b8'
    },
    {
      title: 'Teen Patti',
      totalBet: 100000,
      winAmount: 3000,
      profit: 100000,
      color: '#f0ad4e'
    },
    {
      title: '777 Slot',
      totalBet: 100000,
      winAmount: 3000,
      profit: 100000,
      color: '#9b59b6'
    },
    {
      title: 'SFA Ludo',
      totalBet: 100000,
      winAmount: 3000,
      profit: 100000,
      color: '#F1729B'
    },
    {
      title: 'Fruit Slot',
      totalBet: 100000,
      winAmount: 3000,
      profit: 100000,
      color: '#F48478'
    },
    {
      title: 'SFA Keno',
      totalBet: 100000,
      winAmount: 3000,
      profit: 100000,
      color: '#AD7ED4'
    },
    {
      title: 'SFA Dreamcatcher',
      totalBet: 100000,
      winAmount: 3000,
      profit: 100000,
      color: '#3DA5D9'
    }
  ];


  const cards = [
    {
      title: 'Total Downloads',
      value: data?.totalDownloads,
      icon: <DownloadIcon sx={{ fontSize: 34, color: '#F57C00' }} />,
      gradient: 'linear-gradient(135deg, #FFF7ED, #FFECD1)',
    },
    {
      title: 'Active Users',
      value: data?.activeUsers,
      icon: <PeopleIcon sx={{ fontSize: 34, color: '#10B981' }} />,
      gradient: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
    },
    {
      title: 'Total Admin',
      value: data?.totalAdmin,
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 34, color: '#EC4899' }} />,
      gradient: 'linear-gradient(135deg, #FCE8F6, #F8D4E8)',
    },
    {
      title: 'Total Agency',
      value: data?.totalAgency,
      icon: <BusinessIcon sx={{ fontSize: 34, color: '#0284C7' }} />,
      gradient: 'linear-gradient(135deg, #E0F2FE, #BAE6FD)',
    },
    {
      title: 'New Users',
      value: data?.newUsers,
      icon: <PersonAddAltIcon sx={{ fontSize: 34, color: '#6366F1' }} />,
      gradient: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
    },
  ];




  return (

    <>
      {loading && (
        <div style={{ zIndex: 1050, height: "54%", width: "75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
        </div>
      )}

      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>

        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <div
              style={{
                background: card.gradient,
                borderRadius: '16px',
                border: "1px solid oklch(92.8% 0.006 264.531)",
                padding: '20px',
                color: card.textColor,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '140px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h6 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                  {card.title}
                </h6>
                {card.icon}
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: '26px',
                  fontWeight: 700,
                  marginTop: '12px',
                }}
              >
                {card.value ?? '—'}
              </h3>
            </div>
          </Grid>
        ))}
      </Grid>

      {/* <Grid container rowSpacing={2} columnSpacing={2.75} padding={3}>
        {gameStats.map((game, index) => (
          <Grid item xs={4} md={4} lg={4} key={index}>
            <GameCard {...game} />
          </Grid>
        ))}
      </Grid> */}
    </>
  );
};

export default DashboardDefault;




const styles = {

  statBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#333',
  },
  iconBox: {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellow: {
    backgroundColor: '#ffe9b5',
  },
  pink: {
    backgroundColor: '#ffd7ec',
  },
  green: {
    backgroundColor: '#ccffe5',
  },
  iconImg: {
    width: '16px',
    height: '16px',
  },

  profitGreen: {
    color: '#00b97d',
  },
  profitRed: {
    color: "red",
  }
};