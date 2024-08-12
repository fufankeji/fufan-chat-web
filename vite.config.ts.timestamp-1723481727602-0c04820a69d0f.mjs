// vite.config.ts
import { loadEnv } from "file:///Users/liufuyuan/Desktop/web/fufan-chat-web/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.12+sass@1.77.2/node_modules/vite/dist/node/index.js";
import path, { resolve } from "path";
import vue from "file:///Users/liufuyuan/Desktop/web/fufan-chat-web/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.11+vue@3.4.27/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/liufuyuan/Desktop/web/fufan-chat-web/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.11+vue@3.4.27/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///Users/liufuyuan/Desktop/web/fufan-chat-web/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.11/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import svgLoader from "file:///Users/liufuyuan/Desktop/web/fufan-chat-web/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.4.27/node_modules/vite-svg-loader/index.js";
import UnoCSS from "file:///Users/liufuyuan/Desktop/web/fufan-chat-web/node_modules/.pnpm/unocss@0.60.3_vite@5.2.11/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "/Users/liufuyuan/Desktop/web/fufan-chat-web";
var vite_config_default = ({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());
  const { VITE_PUBLIC_PATH } = viteEnv;
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      // host: "0.0.0.0"
      /** 端口号 */
      port: 8e3,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      proxy: {
        "/api/v1": {
          target: "https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212",
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true
        },
        "/api": {
          target: "http://192.168.110.131:8000",
          ws: false,
          /** 是否允许跨域 */
          changeOrigin: true
        }
      },
      /** 预热常用文件，提高初始页面加载速度 */
      warmup: {
        clientFiles: ["./src/layouts/**/*.vue"]
      }
    },
    build: {
      /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
      chunkSizeWarningLimit: 2048,
      /** 禁用 gzip 压缩大小报告 */
      reportCompressedSize: false,
      /** 打包后静态资源目录 */
      assetsDir: "static",
      rollupOptions: {
        output: {
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            element: ["element-plus", "@element-plus/icons-vue"],
            vxe: ["vxe-table", "vxe-table-plugin-element", "xe-utils"]
          }
        }
      }
    },
    /** 混淆器 */
    esbuild: mode === "development" ? void 0 : {
      /** 打包时移除 console.log */
      pure: ["console.log"],
      /** 打包时移除 debugger */
      drop: ["debugger"],
      /** 打包时移除所有注释 */
      legalComments: "none"
    },
    /** Vite 插件 */
    plugins: [
      vue(),
      vueJsx(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: "url" }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      /** UnoCSS */
      UnoCSS()
    ],
    /** Vitest 单元测试配置：https://cn.vitest.dev/config */
    test: {
      include: ["tests/**/*.test.ts"],
      environment: "jsdom"
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbGl1ZnV5dWFuL0Rlc2t0b3Avd2ViL2Z1ZmFuLWNoYXQtd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbGl1ZnV5dWFuL0Rlc2t0b3Avd2ViL2Z1ZmFuLWNoYXQtd2ViL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9saXVmdXl1YW4vRGVza3RvcC93ZWIvZnVmYW4tY2hhdC13ZWIvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IHR5cGUgQ29uZmlnRW52LCB0eXBlIFVzZXJDb25maWdFeHBvcnQsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgcGF0aCwgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIlxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCJcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIlxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCJcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSBcInZpdGUtc3ZnLWxvYWRlclwiXG5pbXBvcnQgVW5vQ1NTIGZyb20gXCJ1bm9jc3Mvdml0ZVwiXG5cbi8qKiBcdTkxNERcdTdGNkVcdTk4NzlcdTY1ODdcdTY4NjNcdUZGMUFodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnICovXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWdFeHBvcnQgPT4ge1xuICBjb25zdCB2aXRlRW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKSBhcyBJbXBvcnRNZXRhRW52XG4gIGNvbnN0IHsgVklURV9QVUJMSUNfUEFUSCB9ID0gdml0ZUVudlxuICByZXR1cm4ge1xuICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTY4MzlcdTYzNkVcdTVCOUVcdTk2NDVcdTYwQzVcdTUxQjVcdTRGRUVcdTY1MzkgYmFzZSAqL1xuICAgIGJhc2U6IFZJVEVfUFVCTElDX1BBVEgsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgLyoqIEAgXHU3QjI2XHU1M0Y3XHU2MzA3XHU1NDExIHNyYyBcdTc2RUVcdTVGNTUgKi9cbiAgICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpXG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIC8qKiBcdThCQkVcdTdGNkUgaG9zdDogdHJ1ZSBcdTYyNERcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjggTmV0d29yayBcdTc2ODRcdTVGNjJcdTVGMEZcdUZGMENcdTRFRTUgSVAgXHU4QkJGXHU5NUVFXHU5ODc5XHU3NkVFICovXG4gICAgICBob3N0OiB0cnVlLCAvLyBob3N0OiBcIjAuMC4wLjBcIlxuICAgICAgLyoqIFx1N0FFRlx1NTNFM1x1NTNGNyAqL1xuICAgICAgcG9ydDogODAwMCxcbiAgICAgIC8qKiBcdTY2MkZcdTU0MjZcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTZENEZcdTg5QzhcdTU2NjggKi9cbiAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgLyoqIFx1OERFOFx1NTdERlx1OEJCRVx1N0Y2RVx1NTE0MVx1OEJCOCAqL1xuICAgICAgY29yczogdHJ1ZSxcbiAgICAgIC8qKiBcdTdBRUZcdTUzRTNcdTg4QUJcdTUzNjBcdTc1MjhcdTY1RjZcdUZGMENcdTY2MkZcdTU0MjZcdTc2RjRcdTYzQTVcdTkwMDBcdTUxRkEgKi9cbiAgICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxuICAgICAgLyoqIFx1NjNBNVx1NTNFM1x1NEVFM1x1NzQwNiAqL1xuICAgICAgcHJveHk6IHtcbiAgICAgICAgXCIvYXBpL3YxXCI6IHtcbiAgICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly9tb2NrLm1lbmd4dWVndS5jb20vbW9jay82MzIxOGI1ZmI0YzUzMzQ4ZWQyYmMyMTJcIixcbiAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICAvKiogXHU2NjJGXHU1NDI2XHU1MTQxXHU4QkI4XHU4REU4XHU1N0RGICovXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIFwiL2FwaVwiOiB7XG4gICAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly8xOTIuMTY4LjExMC4xMzE6ODAwMFwiLFxuICAgICAgICAgIHdzOiBmYWxzZSxcbiAgICAgICAgICAvKiogXHU2NjJGXHU1NDI2XHU1MTQxXHU4QkI4XHU4REU4XHU1N0RGICovXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvKiogXHU5ODg0XHU3MEVEXHU1RTM4XHU3NTI4XHU2NTg3XHU0RUY2XHVGRjBDXHU2M0QwXHU5QUQ4XHU1MjFEXHU1OUNCXHU5ODc1XHU5NzYyXHU1MkEwXHU4RjdEXHU5MDFGXHU1RUE2ICovXG4gICAgICB3YXJtdXA6IHtcbiAgICAgICAgY2xpZW50RmlsZXM6IFtcIi4vc3JjL2xheW91dHMvKiovKi52dWVcIl1cbiAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICAvKiogXHU1MzU1XHU0RTJBIGNodW5rIFx1NjU4N1x1NEVGNlx1NzY4NFx1NTkyN1x1NUMwRlx1OEQ4NVx1OEZDNyAyMDQ4S0IgXHU2NUY2XHU1M0QxXHU1MUZBXHU4QjY2XHU1NDRBICovXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwNDgsXG4gICAgICAvKiogXHU3OTgxXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHU1OTI3XHU1QzBGXHU2MkE1XHU1NDRBICovXG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgICAvKiogXHU2MjUzXHU1MzA1XHU1NDBFXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU3NkVFXHU1RjU1ICovXG4gICAgICBhc3NldHNEaXI6IFwic3RhdGljXCIsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFx1NTIwNlx1NTc1N1x1N0I1Nlx1NzU2NVxuICAgICAgICAgICAqIDEuIFx1NkNFOFx1NjEwRlx1OEZEOVx1NEU5Qlx1NTMwNVx1NTQwRFx1NUZDNVx1OTg3Qlx1NUI1OFx1NTcyOFx1RkYwQ1x1NTQyNlx1NTIxOVx1NjI1M1x1NTMwNVx1NEYxQVx1NjJBNVx1OTUxOVxuICAgICAgICAgICAqIDIuIFx1NTk4Mlx1Njc5Q1x1NEY2MFx1NEUwRFx1NjBGM1x1ODFFQVx1NUI5QVx1NEU0OSBjaHVuayBcdTUyMDZcdTUyNzJcdTdCNTZcdTc1NjVcdUZGMENcdTUzRUZcdTRFRTVcdTc2RjRcdTYzQTVcdTc5RkJcdTk2NjRcdThGRDlcdTZCQjVcdTkxNERcdTdGNkVcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAgIHZ1ZTogW1widnVlXCIsIFwidnVlLXJvdXRlclwiLCBcInBpbmlhXCJdLFxuICAgICAgICAgICAgZWxlbWVudDogW1wiZWxlbWVudC1wbHVzXCIsIFwiQGVsZW1lbnQtcGx1cy9pY29ucy12dWVcIl0sXG4gICAgICAgICAgICB2eGU6IFtcInZ4ZS10YWJsZVwiLCBcInZ4ZS10YWJsZS1wbHVnaW4tZWxlbWVudFwiLCBcInhlLXV0aWxzXCJdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvKiogXHU2REY3XHU2REM2XHU1NjY4ICovXG4gICAgZXNidWlsZDpcbiAgICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIlxuICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICA6IHtcbiAgICAgICAgICAgIC8qKiBcdTYyNTNcdTUzMDVcdTY1RjZcdTc5RkJcdTk2NjQgY29uc29sZS5sb2cgKi9cbiAgICAgICAgICAgIHB1cmU6IFtcImNvbnNvbGUubG9nXCJdLFxuICAgICAgICAgICAgLyoqIFx1NjI1M1x1NTMwNVx1NjVGNlx1NzlGQlx1OTY2NCBkZWJ1Z2dlciAqL1xuICAgICAgICAgICAgZHJvcDogW1wiZGVidWdnZXJcIl0sXG4gICAgICAgICAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU3OUZCXHU5NjY0XHU2MjQwXHU2NzA5XHU2Q0U4XHU5MUNBICovXG4gICAgICAgICAgICBsZWdhbENvbW1lbnRzOiBcIm5vbmVcIlxuICAgICAgICAgIH0sXG4gICAgLyoqIFZpdGUgXHU2M0QyXHU0RUY2ICovXG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICB2dWVKc3goKSxcbiAgICAgIC8qKiBcdTVDMDYgU1ZHIFx1OTc1OVx1NjAwMVx1NTZGRVx1OEY2Q1x1NTMxNlx1NEUzQSBWdWUgXHU3RUM0XHU0RUY2ICovXG4gICAgICBzdmdMb2FkZXIoeyBkZWZhdWx0SW1wb3J0OiBcInVybFwiIH0pLFxuICAgICAgLyoqIFNWRyAqL1xuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9pY29ucy9zdmdcIildLFxuICAgICAgICBzeW1ib2xJZDogXCJpY29uLVtkaXJdLVtuYW1lXVwiXG4gICAgICB9KSxcbiAgICAgIC8qKiBVbm9DU1MgKi9cbiAgICAgIFVub0NTUygpXG4gICAgXSxcbiAgICAvKiogVml0ZXN0IFx1NTM1NVx1NTE0M1x1NkQ0Qlx1OEJENVx1OTE0RFx1N0Y2RVx1RkYxQWh0dHBzOi8vY24udml0ZXN0LmRldi9jb25maWcgKi9cbiAgICB0ZXN0OiB7XG4gICAgICBpbmNsdWRlOiBbXCJ0ZXN0cy8qKi8qLnRlc3QudHNcIl0sXG4gICAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiXG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBZ0QsZUFBZTtBQUMvRCxPQUFPLFFBQVEsZUFBZTtBQUM5QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sZUFBZTtBQUN0QixPQUFPLFlBQVk7QUFSbkIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUFtQztBQUN4RCxRQUFNLFVBQVUsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQzNDLFFBQU0sRUFBRSxpQkFBaUIsSUFBSTtBQUM3QixTQUFPO0FBQUE7QUFBQSxJQUVMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQTtBQUFBLFFBRUwsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNqQztBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUE7QUFBQSxNQUVOLFlBQVk7QUFBQTtBQUFBLE1BRVosT0FBTztBQUFBLFFBQ0wsV0FBVztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsSUFBSTtBQUFBO0FBQUEsVUFFSixjQUFjO0FBQUEsUUFDaEI7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLElBQUk7QUFBQTtBQUFBLFVBRUosY0FBYztBQUFBLFFBQ2hCO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQSxRQUFRO0FBQUEsUUFDTixhQUFhLENBQUMsd0JBQXdCO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQSxNQUVMLHVCQUF1QjtBQUFBO0FBQUEsTUFFdkIsc0JBQXNCO0FBQUE7QUFBQSxNQUV0QixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTU4sY0FBYztBQUFBLFlBQ1osS0FBSyxDQUFDLE9BQU8sY0FBYyxPQUFPO0FBQUEsWUFDbEMsU0FBUyxDQUFDLGdCQUFnQix5QkFBeUI7QUFBQSxZQUNuRCxLQUFLLENBQUMsYUFBYSw0QkFBNEIsVUFBVTtBQUFBLFVBQzNEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFNBQ0UsU0FBUyxnQkFDTCxTQUNBO0FBQUE7QUFBQSxNQUVFLE1BQU0sQ0FBQyxhQUFhO0FBQUE7QUFBQSxNQUVwQixNQUFNLENBQUMsVUFBVTtBQUFBO0FBQUEsTUFFakIsZUFBZTtBQUFBLElBQ2pCO0FBQUE7QUFBQSxJQUVOLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQTtBQUFBLE1BRVAsVUFBVSxFQUFFLGVBQWUsTUFBTSxDQUFDO0FBQUE7QUFBQSxNQUVsQyxxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGVBQWUsQ0FBQztBQUFBLFFBQ3ZELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQTtBQUFBLE1BRUQsT0FBTztBQUFBLElBQ1Q7QUFBQTtBQUFBLElBRUEsTUFBTTtBQUFBLE1BQ0osU0FBUyxDQUFDLG9CQUFvQjtBQUFBLE1BQzlCLGFBQWE7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
