import * as React from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
import propTypes from 'prop-types'
import Divider from '@mui/material/Divider'

export default function Review(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Login summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            variant="h2"
            primary="Username: "
            secondary={props.stateRegister.username}
          />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText variant="h6" primary="Email: " secondary={props.stateRegister.login} />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            variant="h6"
            primary="Password: "
            secondary={props.stateRegister.password}
          />
        </ListItem>
      </List>
      <Divider
        variant="middle"
        sx={{ borderBottomWidth: 1 }}
        style={{ backgroundColor: 'black' }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Your details
          </Typography>
          <List disablePadding>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText variant="h2" primary="Name: " secondary={props.stateProfile.name} />
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText
                variant="h6"
                primary="Phone: "
                secondary={props.stateProfile.telephone}
              />
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText variant="h6" primary="Fax: " secondary={props.stateProfile.fax} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

Review.propTypes = {
  stateRegister: propTypes.object,
  stateProfile: propTypes.object,
}
