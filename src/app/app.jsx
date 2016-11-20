import React, {Component} from 'react';
import {render} from 'react-dom';
import Project from './Components/Project';
import IconCard from './Components/IconCard';
import Footer from './Components/Footer';
import shortid from 'shortid';
import projects from './data/projects.json';
import './styles/main.scss';

class App extends Component {
    componentDidMount() {
        window.addEventListener('resize', this.onResize);
        setTimeout(this.onResize, 500);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    componentWillReceiveProps() {
        this.onResize();
    }

    onResize = () => {
        let view = this.refs.view;
        if (view) {
            let height = window.innerHeight - view.getBoundingClientRect().top;
            view.style.height = `${height}px`;
        }
    };

    getSkillSets = () => {
        const skillSet = [
            { title: 'javascript', imageFile: 'javascript.jpg' },
            { title: 'html', imageFile: 'html.png' },
            { title: 'sass/scss', imageFile: 'sass.png' },
            { title: 'angularJS 1.x', imageFile: 'angularjs.png' },
            { title: 'reactjs', imageFile: 'reactjs.png' },
            { title: 'rails', imageFile: 'ruby-on-rails.png' },
            { title: 'emberjs', imageFile: 'emberjs.png' },
            { title: 'grunt', imageFile: 'grunt.png' },
            { title: 'webpack', imageFile: 'webpack.png' },
            { title: 'npm', imageFile: 'npm.png' },
            { title: 'git', imageFile: 'github.png' }
        ];
        var skills = [];
        skillSet.forEach((s) => {
            skills.push(<IconCard key={shortid.generate()} title={s.title} imageFilename={s.imageFile}/>)
        });
        return skills;
    };

    render() {
        return (
            <div>
                <header className="header">
                    <h1>
                        Christine's Portfolio
                    </h1>
                </header>
                <div ref="view" className="section-container">
                    {projects.map((p, i) => {
                        //reverse the image and description every other row
                        let reverse = (i % 2 === 0) ? 'reverse' : 'not-reverse';
                        return <Project key={shortid.generate()} data={p} i={i} reverse={reverse} />
                    })}
                    <section className="skills-set">
                        <h1 className="section-title">Skill Sets</h1>
                        <div className="card-container">
                            {this.getSkillSets()}
                        </div>
                    </section>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;