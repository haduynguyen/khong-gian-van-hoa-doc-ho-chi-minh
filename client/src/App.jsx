import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  Register,
  Login,
  Landing,
  Error,
  Contest,
  Category,
  Post,
  Test,
} from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { action as registerAction } from './pages/Register';
import { loader as allPostsLoader } from './pages/admin/AllPosts';
import { loader as addPostLoader } from './pages/admin/AddPost';
import { action as deletePostAction } from './pages/admin/DeletePost';
import { postLoader, categoryLoader } from './pages/admin/EditPost';
import { loader as HomeLayoutLoader } from './pages/HomeLayout';
import { loader as categoryDetailLoader } from './pages/Category';
import { loader as testLoader } from './pages/Test';
import { loader as adminAllCategoriesLoader } from './pages/admin/AllCategories';
import { action as deleteCategoryAction } from './pages/admin/DeleteCategory';
import { loader as editCategoryLoader } from './pages/admin/EditCategory';
import { loader as loginLoader } from './pages/Login';
import { loader as registerLoader } from './pages/Register';
import { loader as contestLoader } from './pages/Contest';
import { loader as adminHomeLayoutLoader } from './pages/admin/AdminLayout';

import {
  AdminAddPost,
  AdminLayout,
  AdminAllPosts,
  AdminEditPost,
  AdminAllCategories,
  AdminAddCategory,
  AdminEditCategory,
} from './pages/admin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    loader: HomeLayoutLoader(queryClient),
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'category/:categoryId',
        element: <Category />,
        loader: categoryDetailLoader(queryClient),
      },
      {
        path: 'post/:postId',
        element: <Post />,
      },
      {
        path: 'contest',
        element: <Contest />,
        loader: contestLoader(queryClient),
      },
      {
        path: 'test',
        element: <Test />,
        loader: testLoader(queryClient),
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
    action: registerAction,
    loader: registerLoader,
  },
  {
    path: '/login',
    element: <Login />,
    loader: loginLoader,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    loader: adminHomeLayoutLoader(queryClient),
    children: [
      {
        index: true,
        element: <AdminAddPost />,
        loader: addPostLoader,
      },
      {
        path: 'posts',
        element: <AdminAllPosts />,
        loader: allPostsLoader(queryClient),
      },
      {
        path: 'edit-post/:postId',
        element: <AdminEditPost />,
        loader: async ({ params }) => {
          const [post, categories] = await Promise.all([
            postLoader(params.postId),

            categoryLoader(),
          ]);
          return { post, categories };
        },
      },
      { path: 'delete-post/:id', action: deletePostAction(queryClient) },
      {
        path: 'categories',
        element: <AdminAllCategories />,
        loader: adminAllCategoriesLoader(queryClient),
      },
      {
        path: 'add-category',
        element: <AdminAddCategory />,
      },
      {
        path: 'edit-category/:categoryId',
        element: <AdminEditCategory />,
        loader: editCategoryLoader(queryClient),
      },
      {
        path: 'delete-category/:id',
        action: deleteCategoryAction(queryClient),
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
