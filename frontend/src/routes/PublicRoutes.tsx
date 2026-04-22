import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import Home from '../pages/public/Home';
import Program from '../pages/public/Program';
import Jofisah from '../pages/public/Jofisah';
import Sholehah from '../pages/public/Sholehah';
import Contact from '../pages/public/Contact';
import ProgramDetail from '../pages/public/ProgramDetail';
<<<<<<< HEAD
import Ruang from '../pages/public/RuangPublic';
=======
import Ruang from '../pages/public/RuangPublic';  
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
import JoinCommunity from '../pages/public/JoinCommunity';
import SubmitArticle from '../pages/public/SubmitArticle';
import ArticlesPublic from '../pages/public/ArticlesPublic';
import ArticleDetail from '../pages/public/ArticleDetail';
<<<<<<< HEAD
import SholehahForm from '../pages/public/SahabatSholehahForm';
import JofisahForm from '../pages/public/SobatJofisahForm';
import LeaderForm from '../pages/public/LeaderForm';
=======
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759


const PublicRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/program" element={<Program />} />
                <Route path="/program/:slug" element={<ProgramDetail />} />
                <Route path="/jofisah" element={<Jofisah />} />
                <Route path="/sholehah" element={<Sholehah />} />
                <Route path="/kontak" element={<Contact />} />
                <Route path="/ruang" element={<Ruang />} />
                <Route path="/join" element={<JoinCommunity />} />
                <Route path="/submit-article" element={<SubmitArticle />} />
                <Route path="/artikel" element={<ArticlesPublic />} />
                <Route path="/artikel/:slug" element={<ArticleDetail />} />
<<<<<<< HEAD
                <Route path="/join-sholehah" element={<SholehahForm />} />
                <Route path="/join-jofisah" element={<JofisahForm />} />
                <Route path="/join-leader" element={<LeaderForm />} />
=======
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
            </Route>
        </Routes>
    );
};

export default PublicRoutes;