import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Settings from '@/settings';
// 与 API 的 HTTP 连接
const httpLink = createHttpLink({
    // 你需要在这里使用绝对路径
    uri: Settings.settings.server.graphQL.host+'/api/g/user'
});

// 缓存实现
const cache = new InMemoryCache();

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
    link: httpLink,
    cache
});

export default apolloClient;
