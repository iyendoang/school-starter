import ButtonAction from "@/Components/ButtonAction";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { IconSchool } from "@tabler/icons-react";
import toast from "react-hot-toast";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    npsn: "",
  });

  const saveSchool = (e) => {
    e.preventDefault();
    post("/apps/schools", {
      onSuccess: () => {
        toast("Data berhasil disimpan", {
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
      <Head title={"Tambah Data Sekolah"} />
      <Card
        title={"Tambah Data Sekolah"}
        icon={<IconSchool size={20} strokeWidth={1.5} />}
        footer={
          <>
            <ButtonAction
              linkBack={"/apps/schools"}
              labelBack="Kembali"
            />
          </>
        }
        form={saveSchool}
      >
        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-1/2">
            <Input
              type={"text"}
              label={"Nama Sekolah"}
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              errors={errors.name}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Input
              type={"text"}
              label={"NPSN Sekolah"}
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

Create.layout = (page) => <AppLayout children={page} />;
