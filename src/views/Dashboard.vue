<script setup>
import { ref } from "vue";
import BarChart from "../components/BarChart.vue";
import PieChart from "../components/PieChart.vue";
import MainButton from "../components/MainButton.vue";
import MainTextField from "../components/MainTextField.vue";
import { buttonNames } from "../util/dashboard";

const startingDate = ref("");
const endingDate = ref("");

const generalData = ref([20, 40, 35, 5]);

const actualButton = ref("");
const isLoading = ref(false);

function buttonFilter(buttonName) {
    if (actualButton.value === buttonName) return;
    actualButton.value = buttonName;

    switch (buttonName) {
        case buttonNames.EXPIRED_BUTTON: {
            generalData.value = [10, 20, 30, 40];
            break;
        }
        case buttonNames.COMPLETED_BUTTON: {
            generalData.value = [40, 30, 20, 10];
            break;
        }
        case buttonNames.IN_COURSE_BUTTON: {
            generalData.value = [20, 40, 10, 30];
            break;
        }
        case buttonNames.OPEN_BUTTON: {
            generalData.value = [20, 30, 10, 40];
            break;
        }
        case buttonNames.SUMMARY_BUTTON: {
            generalData.value = [30, 10, 40, 20];
            break;
        }
    }
}
</script>

<template>
    <v-container class="main-content">
        <v-row>
            <v-col cols="12">
                <span class="main-title"> Dados gerenciais </span>
            </v-col>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <span class="indicator-title">
                            Indicador de período
                        </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2">
                        <MainTextField
                            v-model="startingDate"
                            name="starting-date"
                            label="Data início"
                            placeholder="01/01/2022"
                            :disabled="isLoading"
                        />
                    </v-col>
                    <v-col cols="2">
                        <MainTextField
                            v-model="endingDate"
                            name="ending-date"
                            label="Data fim"
                            placeholder="01/01/2022"
                            :disabled="isLoading"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-container class="container-button-session">
                            <v-row>
                                <v-col offset="1" cols="2">
                                    <MainButton
                                        label="Expiradas"
                                        class="button-session"
                                        color="light-blue-darken-1"
                                        :name="buttonNames.EXPIRED_BUTTON"
                                        :disabled="
                                            isLoading ||
                                            actualButton ===
                                                buttonNames.EXPIRED_BUTTON
                                        "
                                        :callback="
                                            () => {
                                                buttonFilter(
                                                    buttonNames.EXPIRED_BUTTON
                                                );
                                            }
                                        "
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <MainButton
                                        label="Concluídas"
                                        class="button-session"
                                        color="green-darken-1"
                                        :name="buttonNames.COMPLETED_BUTTON"
                                        :disabled="
                                            isLoading ||
                                            actualButton ===
                                                buttonNames.COMPLETED_BUTTON
                                        "
                                        :callback="
                                            () => {
                                                buttonFilter(
                                                    buttonNames.COMPLETED_BUTTON
                                                );
                                            }
                                        "
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <MainButton
                                        label="Em andamento"
                                        class="button-session"
                                        color="yellow-darken-3"
                                        :name="buttonNames.IN_COURSE_BUTTON"
                                        :disabled="
                                            isLoading ||
                                            actualButton ===
                                                buttonNames.IN_COURSE_BUTTON
                                        "
                                        :callback="
                                            () => {
                                                buttonFilter(
                                                    buttonNames.IN_COURSE_BUTTON
                                                );
                                            }
                                        "
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <MainButton
                                        label="Em aberto"
                                        class="button-session"
                                        color="red-lighten-1"
                                        :name="buttonNames.OPEN_BUTTON"
                                        :disabled="
                                            isLoading ||
                                            actualButton ===
                                                buttonNames.OPEN_BUTTON
                                        "
                                        :callback="
                                            () => {
                                                buttonFilter(
                                                    buttonNames.OPEN_BUTTON
                                                );
                                            }
                                        "
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <MainButton
                                        label="Resumo"
                                        class="button-session"
                                        color="purple-lighten-1"
                                        :name="buttonNames.SUMMARY_BUTTON"
                                        :disabled="
                                            isLoading ||
                                            actualButton ===
                                                buttonNames.SUMMARY_BUTTON
                                        "
                                        :callback="
                                            () => {
                                                buttonFilter(
                                                    buttonNames.SUMMARY_BUTTON
                                                );
                                            }
                                        "
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                    <v-col cols="12" class="graph-session text-center">
                        <v-container>
                            <v-row>
                                <v-col
                                    offset="1"
                                    cols="4"
                                    class="general-historic"
                                >
                                    <PieChart
                                        title="Dados históricos"
                                        :labels="[
                                            'Expiradas',
                                            'Concluídas',
                                            'Em andamento',
                                            'Em aberto',
                                        ]"
                                        :data="generalData"
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
                                    offset="2"
                                    cols="4"
                                    class="month-historic"
                                >
                                    <BarChart
                                        title="Histórico mensal"
                                        :labels="[
                                            'Expiradas',
                                            'Concluídas',
                                            'Em andamento',
                                            'Em aberto',
                                        ]"
                                        :data="generalData"
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
}

.month-historic {
    background-color: white;
}
</style>
