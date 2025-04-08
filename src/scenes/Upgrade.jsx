import { useTheme } from "@emotion/react";
import { Fragment } from "react";
import { token } from "../Theme";

export default function Upgrade(){
      const theme =useTheme();
      const colors= token(theme.palette.mode);
    return(
    <Fragment>
        <div class="list-group">
            <a
                href="#"
                class="list-group-item list-group-item-action flex-column align-items-start active"
                aria-current="true"
            >
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Heading</h5>
                    <small class="text-muted">Description</small>
                </div>
                <p class="mb-1">Paragraph</p>
                <small class="text-muted">paragraph footer</small>
            </a>
            <a
                href="#"
                class="list-group-item list-group-item-action flex-column align-items-start"
            >
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Heading</h5>
                    <small class="text-muted">Description</small>
                </div>
                <p class="mb-1">Paragraph</p>
                <small class="text-muted">paragraph footer</small>
            </a>
            <a
                href="#"
                class="list-group-item list-group-item-action flex-column align-items-start disabled"
            >
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Heading</h5>
                    <small class="text-muted">Description</small>
                </div>
                <p class="mb-1">Paragraph</p>
                <small class="text-muted">paragraph footer</small>
            </a>
        </div>
        


    </Fragment>
    );
}