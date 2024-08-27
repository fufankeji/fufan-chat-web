<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { type FormInstance, type FormRules, ElMessage } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue"; // Key, Picture, Loading
import { type LoginRequestData } from "@/api/login/types/login";
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";
import Owl from "./components/Owl.vue";
import { useFocus } from "./hooks/useFocus";

const router = useRouter();
const { isFocus, handleBlur, handleFocus } = useFocus();

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null);

/** 登录按钮 Loading */
const loading = ref(false);
/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
    username: "",
    password: "",
    code: ""
});
const isRegister = ref<boolean>(false);
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
    ]
};
/** 登录逻辑 */
const handleLogin = () => {
    loginFormRef.value?.validate((valid: boolean, fields) => {
        if (valid) {
            loading.value = true;
            useUserStore()
                .login(loginFormData)
                .then(() => {
                    router.push({ path: "/" });
                })
                .catch(() => {
                    loginFormData.password = "";
                })
                .finally(() => {
                    loading.value = false;
                });
        } else {
            console.error("表单校验不通过", fields);
        }
    });
};

const handleRegister = async () => {
    loginFormRef.value?.validate((valid: boolean, fields) => {
        if (valid) {
            loading.value = true;
            useUserStore()
                .register(loginFormData)
                .then(() => {
                    ElMessage({
                        message: "注册成功！",
                        type: "success"
                    });
                    isRegister.value = false;
                })
                .catch(() => {
                    loginFormData.password = "";
                })
                .finally(() => {
                    loading.value = false;
                });
        } else {
            console.error("表单校验不通过", fields);
            loading.value = false;
        }
    });
};
</script>

<template>
    <div class="login-container">
        <ThemeSwitch class="theme-switch" />
        <Owl :close-eyes="isFocus" />
        <div class="login-card">
            <div class="title">
                <!-- <img src="@/assets/layouts/logo-text-2.png" /> -->
            </div>
            <div class="content">
                <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
                    <el-form-item prop="username">
                        <el-input
                            v-model.trim="loginFormData.username"
                            placeholder="用户名"
                            type="text"
                            tabindex="1"
                            :prefix-icon="User"
                            size="large"
                        />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model.trim="loginFormData.password"
                            placeholder="密码"
                            type="password"
                            tabindex="2"
                            :prefix-icon="Lock"
                            size="large"
                            show-password
                            @blur="handleBlur"
                            @focus="handleFocus"
                        />
                    </el-form-item>
                    <el-button
                        v-if="isRegister"
                        :loading="loading"
                        type="primary"
                        size="large"
                        @click.prevent="handleRegister"
                        >注 册</el-button
                    >
                    <el-button v-else :loading="loading" type="primary" size="large" @click.prevent="handleLogin"
                        >登 录</el-button
                    >
                </el-form>
                <el-link v-if="isRegister" class="register-link" @click="isRegister = !isRegister">去登陆</el-link>
                <el-link v-else class="register-link" @click="isRegister = !isRegister">去注册</el-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100%;
    .theme-switch {
        position: fixed;
        top: 5%;
        right: 5%;
        cursor: pointer;
    }
    .login-card {
        width: 480px;
        max-width: 90%;
        border-radius: 20px;
        box-shadow: 0 0 10px #dcdfe6;
        background-color: var(--el-bg-color);
        overflow: hidden;
        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 48px;
            img {
                height: 100%;
            }
        }
        .content {
            padding: 20px 50px 50px 50px;
            :deep(.el-input-group__append) {
                padding: 0;
                overflow: hidden;
            }
            .el-button {
                width: 100%;
                margin-top: 10px;
            }

            .register-link {
                margin-top: 4px;
            }
        }
    }
}
</style>
