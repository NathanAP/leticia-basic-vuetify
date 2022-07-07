<script setup>
const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, required: true },
    color: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    callback: { type: Function, required: true },
});
</script>

<template>
    <v-btn
        block
        size="x-large"
        rounded="lg"
        :name="props.name"
        :color="props.color"
        :disabled="props.disabled"
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
