<!-- 自定义 -->
<template>
    <div class="chat-loading" />
    <div class="chat-loading-sprites" />
</template>

<style lang="scss" scoped>
$loading-size: 24; // loading大小
$loading-img-count: 143; // loading图片循环一次的数量
$regex: "%";

/* 定义@keyframes规则 */
@keyframes chat-loading-animation {
    @for $i from 0 through $loading-img-count {
        #{calc($i/$loading-img-count) * 100}#{$regex} {
            background-image: url("/src/assets/img/chat-loading/" + $i + ".png");
        }
    }
}

/* 应用动画到目标元素 */
.chat-loading {
    width: #{$loading-size}px;
    height: #{$loading-size}px;
    background-size: cover;
    animation: chat-loading-animation 6s infinite; /* 设置动画名称、时长和循环方式 */
}

/* 定义@keyframes规则 */
@keyframes chat-loading-sprites-animation {
    @for $i from 0 through $loading-img-count {
        #{calc($i/$loading-img-count) * 100}#{$regex} {
            background-position: 0 #{calc($i * $loading-size)}px;
        }
    }
}

.chat-loading-sprites {
    width: #{$loading-size}px;
    height: #{$loading-size}px;
    background-size: cover;
    animation: chat-loading-sprites-animation 6s infinite steps(1); /* 设置动画名称、时长和循环方式 */
    background-image: url("/src/assets/img/chat/css_sprites.png");
}
</style>
