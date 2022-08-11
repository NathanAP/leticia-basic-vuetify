<script setup>
const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, required: true },
    color: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: "x-large" },
    callback: { type: Function, required: true },
});
</script>

<template>
    <v-btn
        block
        rounded="lg"
        elevation="1"
        :name="props.name"
        :color="props.color"
        :disabled="props.disabled"
        :size="props.size"
        @click="props.callback"
    >
        <span class="button-label"> {{ props.label }}</span>
    </v-btn>
</template>

<style scoped lang="scss">
.button-label {
    font-weight: 500;
    color: white;
    letter-spacing: 0rem;
}
</style>
