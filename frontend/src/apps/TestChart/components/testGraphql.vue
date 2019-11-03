<template>
  <ApolloQuery
    :query="query"
    :variables="{
      limit: $options.appsize,
      user_id:user_id,
    }"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occured</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">{{ data }}</div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
    <!-- 在这里显示数据 -->
    <button v-if="hasMore" @click="loadMore(query)">Load more</button>
  </ApolloQuery>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    components: {gql:gql},
    pageSize: 10,
    props: {
      user_id: null
    },
    data () {
      return {
        page: 1,
        hasMore: true
      }
    },

    methods: {
      async loadMore (query) {
        await query.fetchMore({
          variables: {
            offset: this.page++ * this.$options.pageSize
          },
          updateQuery: (prev, {fetchMoreResult}) => {
            if (!fetchMoreResult || fetchMoreResult.product.length === 0) {
              this.hasMore = false
              return prev
            }
            return Object.assign({}, prev, {
              product: [...prev.product, ...fetchMoreResult.product]
            })
          }
        })
      },
      query () {
        return gql`
query authUser($user_id: String!) {
    authUser(id:$user_id){
      id
      username
      password
  }
}
  `
      }
    }
  }
</script>
