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

const nav = [
  { icon: <Public />, title: "Abu Abdullah" },
  { icon: <Favorite />, title: "Covid 19 information" },
  { icon: <Person />, title: "Find Friends" },
  { icon: <OndemandVideo />, title: "watch" },
  { icon: <Group />, title: "Groups" },
  { icon: <Storefront />, title: "Marketplace" },
  { icon: <Event />, title: "Events" },
  { icon: <History />, title: "Memories" },
  { icon: <Bookmark />, title: "Saved" },
  { icon: <ExpandMoreOutlined />, title: "See More", expand: "true" },
];

const navMore = [
    { icon: <TrendingUp />, title: "Ads Manager" },
    { icon: <Work />, title: "Jobs" },
    { icon: <LiveTv />, title: "Live Videos" },
    { icon: <Message />, title: "Messanger" },
    { icon: <ChromeReaderMode />, title: "Pages" },
    { icon: <Cloud />, title: "Weather" },
    { icon: <Payment />, title: "Facebook Pay" },
    { icon: <InvertColors />, title: "Blood Donation" },
    { icon: <Healing />, title: "Emotional Health" },
    { icon: <ExpandLessRounded />, title: "See Less", expand: "true" },
  ];

export default function SideNav() {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <List style={{ padding: "0" }}>
        {nav.map((item,id) => (
          <ListItem
            key={id}
            button
            onClick={item.expand ? handleClick : undefined}
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
