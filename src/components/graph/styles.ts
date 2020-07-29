import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flex: 1
        },
        "@keyframes tdAnimation": {
            from: {
                transform: "scaleX(0)"
            },
            to: {
                transform: "scaleX(1)"
            }
        },
        table: {
            overflow: "hidden",
            borderSpacing: 0,
            "& td": {
                textAlign: "center",
                color: "white",
                animation: "$tdAnimation 1500ms"
            },
            "& td.wall": {
                "&:hover": {
                    transform: "scale(1.5)"
                },
                border: "none !important",
                backgroundColor: "grey"
            },
            "& td.searching": {
                border: "none !important",
                backgroundColor: "#61dafb"
            },
            "& td.route": {
                "&:hover": {
                    transform: "scale(1.5)"
                },
                border: "none !important",
                backgroundColor: "lightgreen"
            },
            "& td.source": {
                "&:hover": {
                    transform: "scale(1.5)"
                },
                backgroundColor: "green"
            },
            "& td.destination": {
                "&:hover": {
                    transform: "scale(1.5)"
                },
                backgroundColor: "red"
            }
        }
    })
);
