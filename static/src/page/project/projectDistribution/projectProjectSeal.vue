<template>
  <div class="center-body">
    <seal-info :thisProjectId="thisProjectId" :thisInvestorId="thisInvestorId"></seal-info>
  </div>
</template>

<script>
  import sealInfo from '@/page/reportNumber/sealInfo.vue';
  export default {
    components: {
      sealInfo
    },
    data() {
      return {
        thisProjectId: "",
        thisInvestorId: ""
      };
    },
    created() {
      this.thisProjectId = this.$store.state.projectId;
      this.thisInvestorId = this.$store.state.investorId;
    }
  }
</script>

<style type="text/scss" scoped="scoped" lang="scss">

</style>
