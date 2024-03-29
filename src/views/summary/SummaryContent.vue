<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import BarChart from "../../components/BarChart.vue";
import Event from "../../services/api/event/model";
import { status } from "../../services/api/event/helper";
import { getAllEvents } from "../../services/api/event/request";

const route = useRoute();
const router = useRouter();
const { t } = useI18n({ useScope: "global" });

const dataSummarized = ref([]);
const expiredList = ref([]);
const completedList = ref([]);
const inCourseList = ref([]);
const openList = ref([]);

const startingDate = ref("");
const endingDate = ref("");

const isLoading = ref(false);

if (route.params) {
    const params = route.params;

    startingDate.value = params.startingDate;
    endingDate.value = params.endingDate;

    await findEvents();
}

async function findEvents() {
    isLoading.value = true;

    dataSummarized.value = [];
    expiredList.value = [];
    completedList.value = [];
    inCourseList.value = [];
    openList.value = [];

    const query = {};
    if (startingDate.value) query.startingDate = startingDate.value;
    if (endingDate.value) query.endingDate = endingDate.value;

    const response = await getAllEvents(query);

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
</script>

<template>
    <v-container class="main-content">
        <v-row>
            <v-col cols="12">
                <v-row>
                    <v-btn
                        icon="fas fa-arrow-left"
                        elevation="0"
                        color="transparent"
                        @click="
                            router.push({
                                name: 'dashboard',
                                params: {
                                    startingDate,
                                    endingDate,
                                },
                            })
                        "
                    ></v-btn>
                    <span class="main-title"> Resumo </span>
                </v-row>
            </v-col>
            <v-col cols="12" class="text-center">
                <v-table>
                    <thead>
                        <tr>
                            <th class="title-expired text-center">Expiradas</th>
                            <th class="title-completed text-center">
                                Concluídas
                            </th>
                            <th class="title-in-course text-center">
                                Em andamento
                            </th>
                            <th class="title-open text-center">Em aberto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td
                                v-for="(data, index) in dataSummarized"
                                :key="index"
                            >
                                {{ data }}
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
            <v-col cols="12" class="text-center">
                <v-row justify="center">
                    <v-col cols="4">
                        <BarChart
                            title="Resumo das ocorrências"
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
    padding-left: 1rem;
    font-size: 1.75rem;
    font-weight: 600;
}

.title-expired {
    background-color: #0395dc;
}

.title-completed {
    background-color: #409a44;
}

.title-in-course {
    background-color: #efa124;
}

.title-open {
    background-color: #e6504d;
}
</style>
