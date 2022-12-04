import { Link } from "react-router-dom";

export default function Blog() {
	return (
		<div className="text-white w-full flex items-center justify-center p-4">
			<div className="mt-32 w-full max-w-3xl">
				<h1 className="text-7xl font-mono py-12">Blog</h1>
				<div className="" />
				<ul className="space-y-10">
					<li>
						<Link to="/blog/1" className='space-y-4'>
							<h2 className='text-cyan text-4xl font-mono'>Post 1</h2>
							<p className='text-white'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
								ipsam aliquid sit natus doloremque nemo rem ipsa dicta eum sed
								accusantium, suscipit libero, culpa quod aut eligendi architecto
								nostrum omnis.
							</p>
							<div className="text-cyan font-mono">03/21/2022</div>
						</Link>
					</li>
					<li>
						<Link to="/blog/1">
							<h2 className='text-cyan text-4xl font-mono'>Post 2</h2>
							<p className='text-white'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
								ipsam aliquid sit natus doloremque nemo rem ipsa dicta eum sed
								accusantium, suscipit libero, culpa quod aut eligendi architecto
								nostrum omnis.
							</p>
						</Link>
					</li>
					<li>
						<Link to="/blog/">
							<h2 className='text-cyan text-4xl font-mono'>Post 3</h2>
							<p className='text-white'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
								ipsam aliquid sit natus doloremque nemo rem ipsa dicta eum sed
								accusantium, suscipit libero, culpa quod aut eligendi architecto
								nostrum omnis.
							</p>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
