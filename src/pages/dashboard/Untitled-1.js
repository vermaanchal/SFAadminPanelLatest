
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  MenuItem,
  Select
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import p1 from '../../assets/images/users/p1.png';
import p2 from '../../assets/images/users/p2.png';
import p3 from '../../assets/images/users/p3.png';
import useDashboardHook from './DashboardHook';
const userStats = [
  {
    title: 'Total Users',
    count: 379,
    percentage: 90,
    color: "#2364AA"
  },
  {
    title: 'Active Users',
    count: 379,
    percentage: 80,
    color: "#3DA5D9"
  },
  {
    title: 'Total Download',
    count: 379,
    percentage: 80,
    color: "#1C3557"
  }
];

const gameStats = [
  {
    title: 'SFA GUESS',
    totalBet: 100000,
    winAmount: 3000,
    profit: 100000,
    color: '#52c7b8'
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

const StatCard = ({ title, count, percentage, color }) => (

  <Card className="m-2 flex-grow-1" sx={{ borderRadius: 2, boxShadow: 3 }}>
    <CardContent>
      <div className="d-flex justify-content-between ">
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Select size="small" defaultValue="this_week" sx={{ borderRadius: 2, minWidth: 120 }}>
          <MenuItem value="this_week">This Week</MenuItem>
          <MenuItem value="last_week">Last Week</MenuItem>
          <MenuItem value="this_month">This Month</MenuItem>
        </Select>
      </div>
      <div className="d-flex justify-content-between align-items-start mt-3">
        <div>
          <Typography variant="h4" color="primary" sx={{ mt: 2, color: { color } }}>
            {count}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <ArrowUpwardIcon fontSize="small" sx={{ color: "#1EB159" }} /> by {percentage}% from last week
          </Typography>
        </div>
        <Box sx={{ position: 'relative', display: 'inline-flex', mt: 2 }}>
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={100}
            thickness={5}
            sx={{
              color: { color }
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ArrowUpwardIcon fontSize="large" color="success" />
          </Box>
        </Box>
      </div>
    </CardContent>
  </Card>
);

const GameCard = ({ title, totalBet, winAmount, profit, color }) => (
  <Card className="m-2 flex-grow-1" sx={{ borderRight: `15px solid ${color}`, borderRadius: 5, boxShadow: 1, borderLeft: `1px solid ${color}`, borderBottom: `1px solid ${color}`, borderTop: `1px solid ${color}` }}>
    <CardContent>
      <Typography variant="subtitle1" fontWeight="bold" sx={{ borderBottom: `1px solid ${color}`, paddingBottom: 1 }}>
        {title}
      </Typography>
      <Box className="d-flex justify-content-between align-items-center mt-2">
        <div style={styles.statBox}>
          <div style={{ ...styles.iconBox, ...styles.yellow }}>
            <img src={p3} alt="Total Bet" style={styles.iconImg} />
          </div>
          <span>Total Bet = <strong>{totalBet}</strong></span>
        </div>
        <div style={{ ...styles.iconBox, ...styles.pink }}>
          <img src={p2} alt="Total Win" style={styles.iconImg} />
        </div>
        <span>Win amount  =  <strong style={styles.profitGreen}>{winAmount}</strong></span>
      </Box>
      <Box className="d-flex  align-items-center mt-2" sx={{ gap: 2 }}>
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
);

const DashboardDefault = () => {
  const { data, loading, error } = useDashboardHook();
console.log("lalal",data)
  if (loading) return <Typography sx={{ p: 3 }}>Loading...</Typography>;
  if (error) return <Typography sx={{ p: 3, color: 'red' }}>Error: {error.message}</Typography>;

  // Adjust this
  const { userStatsData = [], gameStatsData = [] } = data || {};


  return (
    <>

      <Grid container rowSpacing={2} columnSpacing={2.75} padding={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>

        {/* Top Stats */}
        {userStats.map((stat, index) => (
          <Grid item xs={12} md={6} lg={6} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}

      </Grid>
      <Grid container rowSpacing={2} columnSpacing={2.75} padding={3}>

        {gameStats.map((game, index) => (
          <Grid item xs={12} md={6} lg={6} key={index}>
            <GameCard {...game} />
          </Grid>
        ))}
      </Grid>
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

