import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flex: 1
        },
        table: {
            overflow: "hidden",
            borderSpacing: 0,
            "& td": {
                textAlign: "center",
                color: "white",
                border: "1px solid black"
            },
            "& td.selected": {
                backgroundColor: "#61dafb"
            },
            "& td.source": {
                backgroundColor: "green"
            },
            "& td.destination": {
                backgroundColor: "red"
            }
        }
    })
);
