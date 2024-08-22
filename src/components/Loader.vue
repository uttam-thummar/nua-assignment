<template>
    <div class="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-10">
        <div class="loader"></div>
    </div>
</template>

<script>
export default {
    name: 'LoaderVue'
};
</script>

<style scoped>
.loader {
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-left-color: #4a90e2;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
