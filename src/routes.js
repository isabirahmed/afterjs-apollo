import React from "react";

import { asyncComponent } from "@jaredpalmer/after";

export const routes = {
  home: {
    path: "/",
    exact: true,
    component: asyncComponent({
      loader: () => import("modules/pages/Home"),
      Placeholder: () => <div>Loading.... </div>
    })
  },
  partners: {
    path: "/partners",
    exact: true,
    component: asyncComponent({
      loader: () => import("modules/pages/PartnersPage"),
      Placeholder: () => <div>Loading....</div>
    })
  }
};

export default Object.values(routes);
