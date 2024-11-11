import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import MainLayout from '../layout/MainLayout';
import Tags from '../views/blog/tags';
import Categories from '../views/blog/categories';
import Auth from '../views/auth';

const Media = lazy(() => import('../views/blog/Media'));
const Post = lazy(() => import('../views/blog/posts'));
const BlogAddEditPost = lazy(() => import('../views/blog/posts/Add-edit-post'));
const BlogEditPost = lazy(() => import('../views/blog/posts/Edit-post'));
const BlogAddEditTag = lazy(() => import('../views/blog/tags/Add-edit-tags'));
const BlogAddEditCategory = lazy(() => import('../views/blog/categories/Add-edit-category'));

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size="large" />
  </div>
);

// Function to check if the user is authenticated
const isAuthenticated = () => !!localStorage.getItem('token');

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={isAuthenticated() ? <MainLayout /> : <Navigate to="/auth" replace />} >
        <Route path="" element={<Navigate to="/blog/media" replace />} />
        <Route path="blog">
          <Route path="" element={<Navigate to="media" replace />} />
          <Route path="media" element={
            <Suspense fallback={<Loading />}>
              <Media />
            </Suspense>
          } />
          <Route
            path="posts">
            <Route
             path=""
              element={
                <Suspense fallback={<Loading />}>
                  <Post />
                </Suspense>
              }
            />
            <Route
              path="add-edit"
              element={
                <Suspense fallback={<Loading />}>
                  <BlogAddEditPost />
                </Suspense>
              }
            />
            <Route
              path="add-edit/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <BlogEditPost />
                </Suspense>
              }
            />
          </Route>
          <Route path="tags">
            <Route
              path=""
              element={
                <Suspense fallback={<Loading />}>
                  <Tags />
                </Suspense>
              }
            />
            <Route
              path="add"
              element={
                <Suspense fallback={<Loading />}>
                  <BlogAddEditTag />
                </Suspense>
              }
            />
            <Route
              path=":id"
              element={
                <Suspense fallback={<Loading />}>
                  <BlogAddEditTag />
                </Suspense>
              }
            />
          </Route>
          <Route path="categories">
            <Route path="" element={
              <Suspense fallback={<Loading />}>
                <Categories />
              </Suspense>
            } />
            <Route path="add" element={
              <Suspense fallback={<Loading />}>
                <BlogAddEditCategory />
              </Suspense>
            } />
            <Route path=":id" element={
              <Suspense fallback={<Loading />}>
                <BlogAddEditCategory />
              </Suspense>
            } />
          </Route>
        </Route>
      </Route>
      <Route path="auth" element={<Auth />} />
    </Routes>
  );
};

export default MainRoutes;
