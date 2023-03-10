import React, { Component, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import history from "../../history";

const authToken = localStorage.getItem("AuthToken");

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
}));

const languages = ["C#", "Visual Basic"];
const outputs = ["code", "executable"];
const runtimes = ["windows", "linux", "mac"];

var options = [];
var schemas = [];

export default function GenerateSchema() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [anchorE3, setAnchorE3] = React.useState(null);
  const [anchorE4, setAnchorE4] = React.useState(null);
  const [showRuntime, setShowRuntime] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [selectedIndex2, setSelectedIndex2] = React.useState(null);
  const [selectedIndex3, setSelectedIndex3] = React.useState(null);
  const [selectedIndex4, setSelectedIndex4] = React.useState(null);

  const loadSchemas = (callback) => {
    axios
      .get("/todos")
      .then((response) => {
        schemas = response.data;
        callback(schemas);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickListItem1 = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleMenuItemClick1 = (event, index) => {
    setSelectedIndex2(index);
    setAnchorE2(null);
  };

  const handleClose1 = () => {
    setAnchorE2(null);
  };

  const handleClickListItem2 = (event) => {
    setAnchorE3(event.currentTarget);
    if (event.currentTarget == "executable") {
      setShowRuntime(true);
    }
  };

  const handleMenuItemClick2 = (event, index) => {
    setSelectedIndex3(index);
    console.log(index);
    setAnchorE3(null);
    if (index == 1) {
      setShowRuntime(true);
    }
  };

  const handleClose2 = () => {
    setAnchorE3(null);
  };

  const handleClickListItem3 = (event) => {
    setAnchorE4(event.currentTarget);
  };

  const handleMenuItemClick3 = (event, index) => {
    setSelectedIndex4(index);
    setAnchorE4(null);
  };

  const handleClose3 = () => {
    setAnchorE4(null);
  };

  // React.useEffect(() => {
  // 	const authToken = localStorage.getItem("AuthToken");
  // 	if (authToken == null) {
  // 		history.push("/login")
  // 	}
  // })

  const handleSubmit = () => {
    let type;
    if (selectedIndex3 == 0) {
      type = 0;
    } else {
      type = selectedIndex4 + 1;
    }

    let schema = schemas[selectedIndex].body;

    axios
      .post(
        `https://localhost:44314/api/scrazzer?language=${selectedIndex2}&type=${type}`,
        schema,
        {
          responseType: "blob", // important
        }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", schema.name + ".zip"); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useLayoutEffect(() => {
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    loadSchemas((schemas) => {
      options = [];
      for (var i = 0; i < schemas.length; i++) {
        options.push(schemas[i].body.name);
      }
    });
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Generate Schema</h4>
            <p className={classes.cardCategoryWhite}>Choose your schema</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <h4>Schema</h4>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <List component="nav" aria-label="Device settings">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="schema"
                    onClick={handleClickListItem}
                  >
                    <ListItemText
                      primary="Schema"
                      secondary={options[selectedIndex]}
                    />
                  </ListItem>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <h4>Language </h4>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <List component="nav" aria-label="Device settings">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="language"
                    onClick={handleClickListItem1}
                  >
                    <ListItemText
                      primary="language"
                      secondary={languages[selectedIndex2]}
                    />
                  </ListItem>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorE2}
                  keepMounted
                  open={Boolean(anchorE2)}
                  onClose={handleClose1}
                >
                  {languages.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex2}
                      onClick={(event) => handleMenuItemClick1(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <h4>Output</h4>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <List component="nav" aria-label="Device settings">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="language"
                    onClick={handleClickListItem2}
                  >
                    <ListItemText
                      primary="Output"
                      secondary={outputs[selectedIndex3]}
                    />
                  </ListItem>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorE3}
                  keepMounted
                  open={Boolean(anchorE3)}
                  onClose={handleClose2}
                >
                  {outputs.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex3}
                      onClick={(event) => handleMenuItemClick2(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </GridItem>
            </GridContainer>
            {showRuntime ? (
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <h4>Runtime</h4>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <List component="nav" aria-label="Device settings">
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="lock-menu"
                      aria-label="language"
                      onClick={handleClickListItem3}
                    >
                      <ListItemText
                        primary="Runtime"
                        secondary={runtimes[selectedIndex4]}
                      />
                    </ListItem>
                  </List>
                  <Menu
                    id="lock-menu"
                    anchorEl={anchorE4}
                    keepMounted
                    open={Boolean(anchorE4)}
                    onClose={handleClose3}
                  >
                    {runtimes.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex4}
                        onClick={(event) => handleMenuItemClick3(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </GridItem>
              </GridContainer>
            ) : null}
          </CardBody>
          <CardFooter>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              className={classes.submitButton}
              onClick={handleSubmit}
            >
              Generate
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
