import axios from "axios";
export default async function sitemap() {
  const blogs = await dynamicSitemap();
  return [
    {
      url: "https://assessment-nextapp.vercel.app/",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // ...blogs.docs.map((blog: any) => ({
    //   url: `https://assessment-nextapp.vercel.app/${blog.slug}`,
    //   lastModified: new Date().toISOString(),
    //   changeFrequency: "weekly",
    //   priority: 0.8,
    // })),
  ];
}
export async function dynamicSitemap() {
  try {
    // const request = await axios
    //   .get(
    //     `https://dev.to/api/articles?page=1&per_page=10`,
    //     {
    //       params: {
    //         pageSize: 999,
    //       },
    //     }
    //   )
    //   .then((res:any) => res.data)
    //   .catch((err:any) => console.log({ err }));
    // return request;
  } catch (error) {}
}
