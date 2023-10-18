import React, { useState, useEffect } from "react";
import ReactGA from 'react-ga4';

import 'react-alice-carousel/lib/alice-carousel.css';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import theme from '../theme.jsx';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import {
	Checkbox,
    Button,
    Collapse,
    IconButton,
    FormGroup,
    FormControl,
    InputLabel,
    FormLabel,
    FormControlLabel,
    Select,
    MenuItem,
    Grid,
    Paper,
    Typography,
    TextField,
    Zoom,
    List,
    ListItem,
    ListItemText,
    Divider,
    Tooltip,
    Chip,
    ButtonGroup,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from "@mui/material";

import { useNavigate, Link } from "react-router-dom";
import WorkflowTemplatePopup from "../components/WorkflowTemplatePopup.jsx";

const ExploreWorkflow = (props) => {
    const { userdata, globalUrl } = props
	const [activeUsecases, setActiveUsecases] = useState(0);
    const [modalOpen, setModalOpen] = React.useState(false);
	const [suggestedUsecases, setSuggestedUsecases] = useState([])
	const [usecasesSet, setUsecasesSet] = useState(false)
	const [apps, setApps] = useState([])
    const sizing = 475

	let navigate = useNavigate();

    const imagestyle = {
        height: 40,
        borderRadius: 40,
        //border: "2px solid rgba(255,255,255,0.3)",
    }

	const loadApps = () => {
		fetch(`${globalUrl}/api/v1/apps`, {
		  method: "GET",
		  headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		  },
		  credentials: "include",
		})
      	.then((response) => {
        	return response.json();
      	})
      	.then((responseJson) => {
			if (responseJson === null) {
			  console.log("null-response from server")
			  const pretend_apps = [{
				"name": "TBD",
				"app_name": "TBD",
				"app_version": "TBD",
				"description": "TBD",
				"version": "TBD",
				"large_image": "",
			  }]
				
			  setApps(pretend_apps)
			  return
			}

			if (responseJson.success === false) {
				console.log("error loading apps: ", responseJson)
			  	return
			}
        
			setApps(responseJson);
		})
		.catch((error) => {
        	console.log("App loading error: " + error.toString());
		})
	}

	// Find priorities in userdata.priorities and check if the item.type === "usecase"
	// If so, set the item.isActive to true
	if (usecasesSet === false && userdata.priorities !== undefined && userdata.priorities !== null && userdata.priorities.length > 0 && suggestedUsecases.length === 0) {

		var tmpUsecases = []
		for (let i = 0; i < userdata.priorities.length; i++) {
			if (userdata.priorities[i].type !== "usecase" || userdata.priorities[i].active === false) {
				continue
			}

			tmpUsecases.push(userdata.priorities[i])
		}

		setSuggestedUsecases(tmpUsecases)
		setUsecasesSet(true)
		loadApps() 
	}

    const modalView = (
        // console.log("key:", dataValue.key),
        //console.log("value:",dataValue.value),
        <Dialog
            open={modalOpen}
            onClose={() => {
                setModalOpen(false);
            }}
            PaperProps={{
                style: {
                    backgroundColor: theme.palette.surfaceColor,
                    color: "white",
                    minWidth: "800px",
                    minHeight: "320px",
                },
            }}
        >
            <DialogTitle style={{}}>
                <div style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CheckBoxSharpIcon sx={{ borderRadius: 4, color: "rgba(255, 132, 68, 1)" }} style={{ width: 24 }} />
                    <span style={{ marginLeft: 8, color: "rgba(255, 132, 68, 1)", fontSize: 16, width: 60 }}>Sign Up</span>
                    <div style={{ borderTop: "1px solid rgba(255, 132, 68, 1)", width: 85, marginLeft: 8, marginRight: 8 }} />
                    <CheckBoxSharpIcon sx={{ borderRadius: 4, color: "rgba(255, 132, 68, 1)" }} style={{ width: 24 }} />
                    <span style={{ marginLeft: 8, color: "rgba(255, 132, 68, 1)", fontSize: 16, width: 60 }}>Setup</span>
                    <div style={{ borderTop: "1px solid rgba(255, 132, 68, 1)", width: 85, marginRight: 8 }} />
                    <CheckBoxSharpIcon sx={{ borderRadius: 4, color: "rgba(255, 132, 68, 1)" }} style={{ width: 24 }} />
                    <span style={{ marginLeft: 8, color: "rgba(255, 132, 68, 1)", fontSize: 16, width: 60 }}>Explore</span>
                </div>
            </DialogTitle>
            <Typography style={{ fontSize: 16, width: 252, marginLeft: 167 }}>
                Here’s a recommended workflow:
            </Typography>
            {/* <div style={{ marginTop: 0, maxWidth: 700, minWidth: 700, margin: "auto", minHeight: sizing, maxHeight: sizing, }}>
                <div style={{ marginTop: 0, }}>
                    <div className="thumbs" style={{ display: "flex" }}>
                        <Tooltip title={"Previous usecase"}>
                            <IconButton
                                style={{
                                    // backgroundColor: thumbIndex === 0 ? "inherit" : "white",
                                    zIndex: 5000,
                                    minHeight: 50,
                                    maxHeight: 50,
                                    color: "grey",
                                    marginTop: 150,
                                    borderRadius: 50,
                                    border: "1px solid rgba(255,255,255,0.3)",
                                }}
                                onClick={() => {
                                    slidePrev()
                                }}
                            >
                                <ArrowBackIosNewIcon />
                            </IconButton>
                        </Tooltip>
                        <div style={{ minWidth: 554, maxWidth: 554, borderRadius: theme.palette.borderRadius, }}>
                            <AliceCarousel
                                style={{ backgroundColor: theme.palette.surfaceColor, minHeight: 750, maxHeight: 750, }}
                                items={formattedCarousel}
                                activeIndex={thumbIndex}
                                infiniteLoop
                                mouseTracking={false}
                                responsive={responsive}
                                // activeIndex={activeIndex}
                                controlsStrategy="responsive"
                                autoPlay={false}
                                infinite={true}
                                animationType="fadeout"
                                animationDuration={800}
                                disableButtonsControls

                            />
                        </div>
                        <Tooltip title={"Next usecase"}>
                            <IconButton
                                style={{
                                    backgroundColor: thumbIndex === usecaseButtons.length - 1 ? "inherit" : "white",
                                    zIndex: 5000,
                                    minHeight: 50,
                                    maxHeight: 50,
                                    color: "grey",
                                    marginTop: 150,
                                    borderRadius: 50,
                                    border: "1px solid rgba(255,255,255,0.3)",
                                }}
                                onClick={() => {
                                    slideNext()
                                }}
                            >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div> */}
            <DialogActions style={{ paddingLeft: "30px", paddingRight: '30px' }}>
                <Button
                    style={{ borderRadius: "0px" }}
                    onClick={() => setModalOpen(false)}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    style={{ borderRadius: "0px" }}
                    onClick={() => {
                        console.log("hello")
                    }}
                    color="primary"
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );


    return (
        <div style={{ marginTop: 0, margin: "auto", minHeight: sizing, maxHeight: sizing, }}>
            {modalView}
            <Typography variant="h4" style={{ marginLeft: 8, marginTop: 40, marginRight: 30, marginBottom: 0, }} color="rgba(241, 241, 241, 1)">
                Start using workflows
            </Typography>
            <Typography variant="body2" style={{ marginLeft: 8, marginTop: 10, marginRight: 30, marginBottom: 40, }} color="rgba(158, 158, 158, 1)">
                Based on what you selected here’s our recommendations!
            </Typography>

            <div style={{ marginTop: 0, }}>
                <div className="thumbs" style={{ display: "flex" }}>
                    <div style={{ minWidth: 554, maxWidth: 554, borderRadius: theme.palette.borderRadius, }}>
                        <Grid item xs={11} style={{}}>
							{suggestedUsecases.length === 0 && usecasesSet ? 
								<Typography variant="h6" style={{ marginTop: 30, marginBottom: 50, }} color="rgba(158, 158, 158, 1)">
									All Workflows are already added for your current apps! 
								</Typography>
							:
							suggestedUsecases.map((priority, index) => {
								
								const srcapp = priority.description.split("&")[0]
								var image1 = priority.description.split("&")[1]
								var image2 = ""
								var dstapp = ""
								if (priority.description.split("&").length > 3) {
									dstapp = priority.description.split("&")[2]
									image2 = priority.description.split("&")[3]
								}

								const name = priority.name.replace("Suggested Usecase: ", "")

								var description = ""
								if (priority.description.split("&").length > 4) {
									description = priority.description[4]
								}

								// FIXME: Should have a proper description 
								description = ""

								return (
									<WorkflowTemplatePopup
										userdata={userdata}
										globalUrl={globalUrl}
										img1={image1}
										srcapp={srcapp}
										img2={image2}
										dstapp={dstapp}
										title={name}
										description={description}

										apps={apps}
									/>
								)
							})}
                        </Grid>
                        <div>
							<div style={{ marginTop: 32 }}>
								<Typography variant="body2" style={{ fontSize: 16, marginTop: 24 }} color="rgba(158, 158, 158, 1)">
									<Button variant="contained" type="submit"
										fullWidth style={{
											borderRadius: 200,
											height: 51,
											width: 464,
											fontSize: 16,
											padding: "16px 24px",
											margin: "auto",
											itemAlign: "center",
											background: activeUsecases === 0 ? "rgba(47, 47, 47, 1)" : "linear-gradient(90deg, #F86744 0%, #F34475 100%)",
											color: activeUsecases === 0? "rgba(158, 158, 158, 1)" : "rgba(241, 241, 241, 1)",
											border: activeUsecases === 0 ? "1px solid rgba(158, 158, 158, 1)" : "none",
										}}
										onClick={() => {
											navigate("/workflows?message="+activeUsecases+" workflows added")
										}}>
										Continue to workflows	
									</Button>
								</Typography>
							</div>
                            <Typography variant="body2" style={{ fontSize: 16, marginTop: 24 }} color="rgba(158, 158, 158, 1)">
                                <Link style={{ color: "#f86a3e", marginLeft: 145 }} to="/usecases" className="btn btn-primary">
									Explore usecases 
                                </Link>
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ExploreWorkflow