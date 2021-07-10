import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@material-ui/core";
import {
  Public,
  Favorite,
  Group,
  OndemandVideo,
  Storefront,
  Person,
  Event,
  Memory,
  History,
  ExpandMoreOutlined,
  Bookmark,
  TrendingUp,
  Work,
  LiveTv,
  Message,
  Cloud,
  Payment,
  InvertColors,
  Healing,
  ChromeReaderMode,
  ExpandLessRounded,
} from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import {useRouter} from 'next/router'
const nav = [
  // { icon: <img src={user.profile_photo} style={{width:"20px",height:"20px",borderRadius:"40px"}}/>, title: "Abu Abdullah" },
  { icon: <Favorite style={{color:"#f74a67"}}/>, title: "Covid 19 information" },
  { icon: <Person />, title: "Find Friends", link:"/friends" },
  { icon: <OndemandVideo style={{color:"red"}}/>, title: "watch" },
  { icon: <Group style={{color:"#37a000"}}/>, title: "Groups" },
  { icon: <Storefront style={{color:"#f6803e"}}/>, title: "Marketplace" },
  { icon: <Event style={{color:"#99130a"}}/>, title: "Events" },
  { icon: <History style={{color:"#b337b0"}}/>, title: "Memories" },
  { icon: <Bookmark style={{color:"#18202e"}}/>, title: "Saved" },
  { icon: <ExpandMoreOutlined />, title: "See More", expand: "true" },
];

const navMore = [
    { icon: <TrendingUp style={{color:"#e03251"}}/>, title: "Ads Manager" },
    { icon: <Work style={{color:"#cf5218"}}/>, title: "Jobs" },
    { icon: <LiveTv style={{color:"#0ae41c"}}/>, title: "Live Videos" },
    { icon: <Message style={{color:"#4e0250"}}/>, title: "Messanger" },
    { icon: <ChromeReaderMode style={{color:"#2a7a9c"}}/>, title: "Pages" },
    { icon: <Cloud style={{color:"#111111"}}/>, title: "Weather" },
    { icon: <Payment style={{color:"#091721"}}/>, title: "Facebook Pay" },
    { icon: <InvertColors style={{color:"#e4190a"}}/>, title: "Blood Donation" },
    { icon: <Healing style={{color:"#f6803e"}}/>, title: "Emotional Health" },
    { icon: <ExpandLessRounded />, title: "See Less", expand: "true" },
  ];

const SideNav = ({user}) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const router = useRouter()

  return (
    <React.Fragment>
      <List style={{ padding: "0" }}>
      <ListItem
            button
            style={{
              paddingLeft: "5px",
            }}
          >
            <ListItemIcon
              style={{
                minWidth: "0",
              }}
            >
      <img src={user.profile_photo} style={{width:"25px",height:"25px",borderRadius:"40px"}}/>
            </ListItemIcon>
            <ListItemText style={{ marginLeft: "7.5px", color: "#000",fontSize:"12px" }}>
              {user.name}
            </ListItemText>
          </ListItem>
        {nav.map((item,id) => (
          <ListItem
            key={id}
            button
            // onClick={item.expand ? handleClick : undefined}
            onClick={item.expand ? handleClick : item.link ? () => router.push(item.link) : undefined}
            style={{
              paddingLeft: "5px",
              display: item.expand ? open ? "none" : "flex" : "flex"
            }}
          >
            <ListItemIcon
              style={{
                minWidth: "0",
                color: item.expand ? "#000" : "#009cde",
                backgroundColor: item.expand ? "#ccc" : "",
                borderRadius: item.expand ? "50px" : "",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText style={{ marginLeft: "7.5px", color: "#000",fontSize:"12px" }}>
              {item.title}
            </ListItemText>
          </ListItem>
        ))}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
              {navMore.map(item=>(

            <ListItem
            key={item.title}
              button
              onClick={item.expand ? handleClick : undefined}
              style={{
                paddingLeft: "5px",
              }}
            >
              <ListItemIcon
                style={{
                  minWidth: "0",
                  color: item.expand ? "#000" :"#009cde",
                  backgroundColor: item.expand ? "#ccc" : "",
                  borderRadius: item.expand ? "50px" : "",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText style={{ marginLeft: "7.5px", color: "#000" }}>
                {item.title}
              </ListItemText>
            </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(SideNav)