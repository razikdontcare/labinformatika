import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "@/components/ui/image";
import picture from "../../images/pengelola.jpg";

export default function AboutContent() {
  return (
    <>
      <h1 className="mt-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Tentang Kami
      </h1>
      <div>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Laboratorium Komputer Program Studi Informatika, Universitas Udayana,
          adalah fasilitas akademik yang didedikasikan untuk mendukung kegiatan
          belajar-mengajar, penelitian, dan pengembangan teknologi informasi.
          Sebagai pusat kegiatan akademik, laboratorium ini menyediakan
          infrastruktur terkini dan lingkungan yang kondusif bagi mahasiswa dan
          dosen untuk mengeksplorasi berbagai aspek ilmu komputer.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Laboratorium ini juga menjadi wadah kolaborasi antara mahasiswa,
          dosen, dan praktisi untuk menciptakan inovasi teknologi yang
          bermanfaat bagi masyarakat. Dengan visi menjadi pusat keunggulan di
          bidang teknologi informasi, kami terus berkomitmen untuk memberikan
          pelayanan terbaik dalam menunjang pembelajaran dan riset.
        </p>
      </div>
      <h2 className="mt-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Profil Pengelola
      </h2>
      <div className="flex">
        <div className="flex w-32 items-center justify-center">
          <AspectRatio ratio={4 / 5}>
            <Image
              src={picture}
              alt={"I Gusti Agung Gede Arya Kadyanan, S.Kom., M.Kom."}
              objectFit="cover"
              className="h-full w-full"
            />
          </AspectRatio>
        </div>
      </div>
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Nama Lengkap
        </h3>
        <p className="leading-7">
          I Gusti Agung Gede Arya Kadyanan, S.Kom., M.Kom.
        </p>
      </div>
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Jabatan Fungsional
        </h3>
        <p className="leading-7">Lektor</p>
      </div>
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Riwayat Pendidikan
        </h3>
        <ul className="ml-6 list-disc [&>li]:mt-2">
          <li>
            <strong>S1</strong>: STIKOM Surabaya, Sistem Informasi, 2003-2007
          </li>
          <li>
            <strong>S2</strong>: Universitas Indonesia, Ilmu Komputer, 2009-2011
          </li>
        </ul>
      </div>
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Penelitian 5 Tahun Terakhir
        </h3>
        <div className="my-6 w-full overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                  Judul Penelitian
                </th>
                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                  Tahun
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  <i>{'"Pendeteksi Objek dengan keyblock Framework"'}</i>
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  2013
                </td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  <i>
                    {
                      '"Perancangan Sistem Rekomendasi Untuk Menentukan Dewasa Ayu (Hari Baik) Untuk Pelaksanaan Yadnya Di Bali"'
                    }
                  </i>
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  2017
                </td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  <i>
                    {
                      '"Pengembangan Web Portal Wisata Terintegrasi E-Commerce Untuk Pelayanan Pertunjukan Seni Dan Budaya"'
                    }
                  </i>
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  2018
                </td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  <i>
                    {
                      '"Pengembangan Rekomender Sistem Layanan Kesehatan Terintegrasi E-Commerce"'
                    }
                  </i>
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  2018
                </td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  <i>
                    {
                      '"Taripedia Sebuah Ensiklopedia Budaya Teintegrasi E-Commerce"'
                    }
                  </i>
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  2019
                </td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  <i>
                    {
                      '"Aplikasi Sistem Informasi Pengelolaan Pertunjukan Seni Terintegrasi Berbasis Crowd Sourcing"'
                    }
                  </i>
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  2019
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
