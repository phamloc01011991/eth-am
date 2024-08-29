<script setup>
  import { languagePack } from '../languages'
</script>

<template>
  <div id="footer">
    <ul>
        <li>
            <RouterLink to="/" active-class="active-link">
                <div class="icon">
                    <i class='bx bxs-home' ></i>
                </div>
                <div class="title">
                    {{ languagePack.footer1 }}
                </div>
            </RouterLink>
        </li>
        <li>
            <RouterLink to="/swaps" active-class="active-link">
                <div class="icon">
                    <i class='bx bx-transfer'></i>
                </div>
                <div class="title">
                    {{ languagePack.footer2 }}
                </div>
            </RouterLink>
        </li>
        <li>
            <RouterLink to="/friends" active-class="active-link">
                <div class="icon">
                    <i class='bx bxs-user-plus'></i>
                </div>
                <div class="title">
                    {{ languagePack.footer3 }}
                </div>
            </RouterLink>
        </li>
        <li>
            <RouterLink to="/market" active-class="active-link">
                <div class="icon">
                    <i class='bx bx-line-chart' ></i>
                </div>
                <div class="title">
                    {{ languagePack.footer4 }}
                </div>
            </RouterLink>
        </li>
    </ul>
  </div>
</template>

<style scoped>
    #footer {
        max-width: 1280px;
        position: fixed;
        left:0;
        right: 0;
        bottom: 12px;
        margin: 0 auto;
        z-index: 99999999999;
    }
    #footer ul {
        display: flex;
        justify-content: space-between;
        padding: 5px;
        margin-inline: 10px;
        background: #282b30;
        border-radius: 10px;
        box-shadow: 0 -2px 5px rgba(61, 62, 63, 0.3) !important;
    }
    #footer ul li {
        display: inline-block;
    }
    #footer ul li a {
        display: inline-block;
        text-align: center;
        padding: 5px 10px;
        color: #a0a0a2;
    }
    .active-link {
        background: #1c1f24;
        border-radius: 10px;
        
    }
    .active-link i {
        color: #5773ff;
    }
    .active-link .title {
        color: #fff;
    }
    #footer ul li .icon i {
        display: block;
        font-size: 23px;
    }
    #footer ul li .title {
        font-size: 12px;
    }
</style>
