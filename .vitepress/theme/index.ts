// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { useData , useRoute } from 'vitepress'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import vitepressBackToTop from 'vitepress-plugin-back-to-top'

import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

import {
  NolebasePagePropertiesPlugin,
} from '@nolebase/vitepress-plugin-page-properties/client'
import '@nolebase/vitepress-plugin-page-properties/client/style.css'

import {  
  NolebaseHighlightTargetedHeading,  
} from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css' 

import {
  NolebaseInlineLinkPreviewPlugin,
} from '@nolebase/vitepress-plugin-inline-link-preview/client'

import '@nolebase/vitepress-plugin-inline-link-preview/client/style.css'

import "vitepress-markdown-timeline/dist/theme/index.css";

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';

import type { Options } from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import { InjectionKey } from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import giscusTalk from 'vitepress-plugin-comment-with-giscus';

import { 
  NolebaseEnhancedReadabilitiesMenu, 
  NolebaseEnhancedReadabilitiesScreenMenu, 
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

import Video from './components/Video.vue'
import MNavLinks from './components/MNavLinks.vue'
import Navlink from './components/Navlink.vue'

export default {
  extends: DefaultTheme,

  enhanceApp({app}) {
    app.component('Video' , Video)
    app.component('MNavLinks' , MNavLinks)
    app.component('Navlink' , Navlink)
    app.provide(InjectionKey, {
      // Configuration
    } as Options)
    app.use(NolebaseGitChangelogPlugin)
    app.use(NolebaseInlineLinkPreviewPlugin)
    app.use(NolebaseGitChangelogPlugin, {
      // Configuration
    })
    enhanceAppWithTabs(app)
    vitepressBackToTop({
      // default
      threshold:300
    })
  },

  Layout: () => {
    const props: Record<string, any> = {}
    const { frontmatter } = useData()

    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(DefaultTheme.Layout, props, {
            // A enhanced readabilities menu for wider screens
            'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu), 
            // A enhanced readabilities menu for narrower screens (usually smaller than iPad Mini)
            'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu), 
            'layout-top': () => [
              h(NolebaseHighlightTargetedHeading),
            ],
    })
  },
  
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );

    const { frontmatter } = useData();

  },

} satisfies Theme