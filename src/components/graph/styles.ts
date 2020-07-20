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
            "& td.selected": {
                "&:hover": {
                    transform: "scale(1.5)"
                },
                backgroundColor: "#61dafb"
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