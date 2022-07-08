import { createRouter, createWebHistory } from "vue-router";

// Views
const Dashboard = () => import("../views/dashboard/Dashboard.vue");
const DashboardContent = () =>
    import("../views/dashboard/DashboardContent.vue");

const NotFound = () => import("../views/notFound/NotFound.vue");
const NotFoundContent = () => import("../views/notFound/NotFoundContent.vue");

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Dashboard
        {
            path: "/",
            component: Dashboard,
            children: [
                {
                    path: "",
                    name: "dashboard",
                    components: {
                        default: DashboardContent,
                    },
                },
            ],
        },
        // Expirados
        {
            path: "/expired",
            component: Dashboard,
            children: [
                {
                    path: "/expired",
                    name: "expired",
                    components: {
                        default: DashboardContent,
                    },
                },
            ],
        },
        // Page not found
        {
            path: "/:pathMatch(.*)*",
            component: NotFound,
            children: [
                {
                    path: "",
                    name: "notFound",
                    component: NotFoundContent,
                },
            ],
        },
    ],
});

export default router;
