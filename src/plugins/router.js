import { createRouter, createWebHistory } from "vue-router";

// Views
const Dashboard = () => import("../views/dashboard/Dashboard.vue");
const DashboardContent = () =>
    import("../views/dashboard/DashboardContent.vue");

const Datatable = () => import("../views/datatable/Datatable.vue");
const DatatableContent = () =>
    import("../views/datatable/DatatableContent.vue");

const Summary = () => import("../views/summary/Summary.vue");
const SummaryContent = () => import("../views/summary/SummaryContent.vue");

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
        // Datatable
        {
            path: "/datatable",
            component: Datatable,
            children: [
                {
                    path: "",
                    name: "datatable",
                    components: {
                        default: DatatableContent,
                    },
                },
            ],
        },
        // Summary
        {
            path: "/summary",
            component: Summary,
            children: [
                {
                    path: "",
                    name: "summary",
                    components: {
                        default: SummaryContent,
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
