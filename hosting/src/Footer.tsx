import { Launch } from '@carbon/icons-react';

export default function Footer() {
  return (
    <>
      <section className="footerElement">
        <ul className="linkList">
          <li>
            <a href="https://www.github.com/dybev">
              Github
              <Launch />
            </a>
          </li>
          <li>
            <a href="https://www.github.com/dybev/dybev.github.io">
              Source
              <Launch />
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
