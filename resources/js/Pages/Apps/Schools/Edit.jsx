import ButtonAction from "@/Components/ButtonAction";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    IconSchool
} from "@tabler/icons-react";
import toast from "react-hot-toast";

export default function Edit() {
  const { school } = usePage().props;
  const { data, setData, put, processing, errors } = useForm({
    name: school.data.name,
    npsn: school.data.npsn,
  });

  const updateSchool = (e) => {
    e.preventDefault();
    put(`/apps/schools/${school.data.id}`, {
      onSuccess: () => {
        toast("Data berhasil diperbarui", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#1C1F29",
            color: "#fff",
          },
        });
      },
    });
  };

  return (
    <>
      <Head title="Edit Data Sekolah" />
      <Card
        title="Edit Data Sekolah"
        icon={<IconSchool size={20} strokeWidth={1.5} />}
        footer={
          <>
            <ButtonAction
              linkBack={"/apps/schools"}
              labelBack="Kembali"
              onSubmit={updateSchool}
            />
          </>
        }
        form={updateSchool}
      >
        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              label="Nama Sekolah"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              errors={errors.name}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              label="NPSN Sekolah"
              value={data.npsn}
              onChange={(e) => setData("npsn", e.target.value)}
              errors={errors.npsn}
            />
          </div>
        </div>
      </Card>
    </>
  );
}

Edit.layout = (page) => <AppLayout children={page} />;
