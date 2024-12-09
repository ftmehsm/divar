import AddPostForm from '@/components/templates/AddPostForm';
import PostList from '@/components/templates/PostList';
import React from 'react';

function DashBoard() {
    return (
        <div>
            <AddPostForm/>
            <PostList/>
        </div>
    );
}

export default DashBoard;