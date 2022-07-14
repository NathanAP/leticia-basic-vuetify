<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import BarChart from "../../components/BarChart.vue";
import PieChart from "../../components/PieChart.vue";
import MainButton from "../../components/MainButton.vue";
import MainTextField from "../../components/MainTextField.vue";
import Event from "../../services/api/event/model";
import { status, statusList } from "../../services/api/event/helper";
import { getAllEvents } from "../../services/api/event/request";
import { buttonNames } from "../../util/dashboard";

const router = useRouter();
const { t } = useI18n({ useScope: "global" });

const eventList = ref([]);

const startingDate = ref("");
const endingDate = ref("");

const dataSummarized = ref([]);
const expiredList = ref([]);
const completedList = ref([]);
const inCourseList = ref([]);
const openList = ref([]);

const isLoading = ref(false);

async function findEvents() {
    isLoading.value = true;

    dataSummarized.value = [];
    expiredList.value = [];
    completedList.value = [];
    inCourseList.value = [];
    openList.value = [];

    const response = await getAllEvents();

    if (Array.isArray(response) && response.length > 0) {
        for (const object of response) {
            const event = new Event(object);
            switch (event.statusId) {
                case status.OPEN: {
                    openList.value.push(event);
                    break;
                }
                case status.COMPLETED: {
                    completedList.value.push(event);
                    break;
                }
                case status.IN_COURSE: {
                    inCourseList.value.push(event);
                    break;
                }
                case status.EXPIRED: {
                    expiredList.value.push(event);
                    break;
                }
            }
        }

        dataSummarized.value = [
            expiredList.value.length,
            completedList.value.length,
            inCourseList.value.length,
            openList.value.length,
        ];
    }

    isLoading.value = false;
}

function redirectButton(buttonStatus) {
    isLoading.value = true;

    if (buttonStatus !== buttonNames.SUMMARY_BUTTON)
        router.push({
            name: "datatable",
            params: { dataToSearch: statusList[buttonStatus] },
        });
    else
        router.push({
            name: "summary",
        });
}

await findEvents();
</script>

<template>
    <v-container class="main-content">
        <v-row>
            <v-col cols="12">
                <span class="main-title">
                    {{ t("default.main.title") }}
                </span>
            </v-col>
            <v-col cols="12">
                <v-row justify="end">
                    <v-col cols="12" sm="12" md="8" lg="4" xl="4">
                        <p class="indicator-title">
                            {{ t("default.main.filterTitle") }}
                        </p>
                    </v-col>
                </v-row>
                <v-row justify="end">
                    <v-col cols="6" sm="6" md="4" lg="2" xl="2">
                        <MainTextField
                            v-model="startingDate"
                            name="starting-date"
                            placeholder="01/01/2022"
                            :label="t('default.main.filterStartingDate')"
                            :disabled="isLoading"
                        />
                    </v-col>
                    <v-col cols="6" sm="6" md="4" lg="2" xl="2">
                        <MainTextField
                            v-model="endingDate"
                            name="ending-date"
                            placeholder="01/01/2022"
                            :label="t('default.main.filterEndingDate')"
                            :disabled="isLoading"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-container class="container-button-session">
                            <v-row>
                                <v-col
                                    offset-lg="1"
                                    offset-xl="1"
                                    cols="12"
                                    sm="12"
                                    md="4"
                                    lg="2"
                                    xl="2"
                                >
                                    <MainButton
                                        class="button-session"
                                        color="light-blue-darken-1"
                                        :label="t('default.main.expired')"
                                        :name="buttonNames.EXPIRED_BUTTON"
                                        :disabled="isLoading"
                                        :callback="
                                            () => {
                                                redirectButton(status.EXPIRED);
                                            }
                                        "
                                    />
                                </v-col>
                                <v-col cols="12" sm="12" md="4" lg="2" xl="2">
                                    <MainButton
                                        class="button-session"
                                        color="green-darken-1"
                                        :label="t('default.main.completed')"
                                        :name="buttonNames.COMPLETED_BUTTON"
                                        :disabled="isLoading"
                                        :callback="
                                            () => {
                                                redirectButton(
                                                    status.COMPLETED
                                                );
                                            }
                                        "
                                    />
                                </v-col>
                                <v-col cols="12" sm="12" md="4" lg="2" xl="2">
                                    <MainButton
                                        class="button-session"
                                        color="yellow-darken-3"
                                        :label="t('default.main.inCourse')"
                                        :name="buttonNames.IN_COURSE_BUTTON"
                                        :disabled="isLoading"
                                        :callback="
                                            () => {
                                                redirectButton(
                                                    status.IN_COURSE
                                                );
                                            }
                                        "
                                    />
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="2" xl="2">
                                    <MainButton
                                        class="button-session"
                                        color="red-lighten-1"
                                        :label="t('default.main.open')"
                                        :name="buttonNames.OPEN_BUTTON"
                                        :disabled="isLoading"
                                        :callback="
                                            () => {
                                                redirectButton(status.OPEN);
                                            }
                                        "
                                    />
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="2" xl="2">
                                    <MainButton
                                        class="button-session"
                                        color="purple-lighten-1"
                                        :label="t('default.main.summary')"
                                        :name="buttonNames.SUMMARY_BUTTON"
                                        :disabled="isLoading"
                                        :callback="
                                            () => {
                                                redirectButton(
                                                    buttonNames.SUMMARY_BUTTON
                                                );
                                            }
                                        "
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                    <v-col cols="12" class="text-center">
                        <v-container>
                            <v-row>
                                <v-col
                                    offset-lg="1"
                                    offset-xl="1"
                                    cols="12"
                                    sm="12"
                                    md="5"
                                    lg="4"
                                    xl="4"
                                    class="general-historic"
                                >
                                    <PieChart
                                        :title="t('default.main.pieChartTitle')"
                                        :labels="[
                                            t('default.main.expired'),
                                            t('default.main.completed'),
                                            t('default.main.inCourse'),
                                            t('default.main.open'),
                                        ]"
                                        :data="dataSummarized"
                                        :colors="[
                                            '#0395dc',
                                            '#409a44',
                                            '#efa124',
                                            '#e6504d',
                                            '#ae4ebf',
                                        ]"
                                    />
                                </v-col>
                                <v-col
                                    offset-md="2"
                                    offset-lg="2"
                                    offset-xl="2"
                                    cols="12"
                                    sm="12"
                                    md="5"
                                    lg="4"
                                    xl="4"
                                    class="month-historic"
                                >
                                    <BarChart
                                        :title="t('default.main.barChartTitle')"
                                        :labels="[
                                            t('default.main.expired'),
                                            t('default.main.completed'),
                                            t('default.main.inCourse'),
                                            t('default.main.open'),
                                        ]"
                                        :data="dataSummarized"
                                        :colors="[
                                            '#0395dc',
                                            '#409a44',
                                            '#efa124',
                                            '#e6504d',
                                            '#ae4ebf',
                                        ]"
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
.main-content {
    background-color: #ececec;
    padding: 1.5rem;
}

.main-title {
    font-size: 1.5rem;
    font-weight: 600;
}

.indicator-title {
    font-size: 1.125rem;
}

.container-button-session {
    background-color: #d4d4d4;
}

.general-historic {
    background-color: white;
    padding-top: 0.625rem;
}

.month-historic {
    background-color: white;
    padding-top: 0.625rem;
}
</style>
